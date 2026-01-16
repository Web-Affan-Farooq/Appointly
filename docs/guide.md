# Better Auth + FastAPI + Next.js: Complete JWT Integration Guide

## What You'll Learn

This guide shows you how to securely connect Better Auth with a FastAPI backend using JWT tokens. By the end, you'll have a full-stack authentication system that keeps user data isolated and secure.

## Why This Matters

**The Problem**: Better Auth runs on your Next.js frontend, but your FastAPI backend needs to verify user identity independently.

**The Solution**: JWT tokens act as a secure bridge between services without requiring shared sessions or databases.

## How the Integration Works

1. User logs in ’ Better Auth creates JWT
2. Frontend sends requests ’ Attaches JWT in `Authorization: Bearer <token>`
3. FastAPI receives request ’ Verifies JWT signature using public key
4. Backend identifies user ’ Filters data by authenticated user ID

## Step 1: Set Up Better Auth with JWT Plugin

### Install Dependencies

```bash
npm install better-auth @better-auth/next-js
```

### Configure Better Auth

Create `lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";

export const auth = betterAuth({
  database: {
    provider: "sqlite", // or "postgresql", "mysql"
    url: process.env.DATABASE_URL!,
  },
  secret: process.env.BETTER_AUTH_SECRET!, // Same as FastAPI secret
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    jwt({
      algorithm: "HS256",
      expiresIn: "7d", // Token expires after 7 days
      issuer: process.env.AUTH_ISSUER || "https://your-app.com",
      audience: [process.env.AUTH_AUDIENCE || "https://api.your-app.com"],
    }),
  ],
});
```

### Create API Route Handler

Create `app/api/auth/[...all]/route.ts`:

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

## Step 2: Build FastAPI JWT Verifier

### Install Python Dependencies

```bash
pip install fastapi "python-jose[cryptography]" python-multipart requests uvicorn
```

### Create JWT Verification Module

Create `app/auth/jwt_verifier.py`:

```python
import requests
from fastapi import HTTPException, status
from jose import jwt, JWTError
from typing import Dict, Optional
import os

# Get Better Auth URL from environment
BETTER_AUTH_URL = os.getenv("BETTER_AUTH_URL", "http://localhost:3000")
JWKS_URL = f"{BETTER_AUTH_URL}/api/auth/jwks"

# Cache public keys to avoid repeated requests
JWKS_CACHE = None

def get_jwks():
    """Fetch and cache public keys from Better Auth."""
    global JWKS_CACHE
    if JWKS_CACHE is None:
        try:
            response = requests.get(JWKS_URL)
            response.raise_for_status()
            JWKS_CACHE = response.json()
        except requests.exceptions.RequestException as e:
            raise Exception(f"Failed to fetch JWKS: {e}")
    return JWKS_CACHE

def verify_better_auth_token(token: str) -> Optional[Dict]:
    """Verify JWT using Better Auth public key."""
    jwks = get_jwks()

    try:
        # Get key ID from token header
        header = jwt.get_unverified_header(token)
        kid = header.get("kid")

        if not kid:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token is missing key ID"
            )

        # Find matching public key
        matching_key = next(
            (key for key in jwks["keys"] if key["kid"] == kid),
            None
        )
        if matching_key is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Public key for token not found"
            )

        # Verify and decode token
        payload = jwt.decode(
            token,
            matching_key,
            algorithms=["RS256"],
            audience=os.getenv("AUTH_AUDIENCE", "https://api.your-app.com"),
            issuer=os.getenv("AUTH_ISSUER", "https://your-app.com"),
        )
        return payload

    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or expired token: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
```

## Step 3: Create FastAPI Dependencies

Create `app/dependencies.py`:

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from app.auth.jwt_verifier import verify_better_auth_token

# Extract token from Authorization header
oauth2_scheme = HTTPBearer()

def get_current_user(credentials: HTTPBearer = Depends(oauth2_scheme)):
    """Verify JWT and return user data."""
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )

    # Extract token from credentials
    user_payload = verify_better_auth_token(credentials.credentials)

    if user_payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    return user_payload
```

## Step 4: Build Protected FastAPI Endpoints

Create `app/main.py`:

```python
from fastapi import FastAPI, Depends, HTTPException
from app.dependencies import get_current_user
from typing import Dict, Any

app = FastAPI(
    title="Better Auth FastAPI Backend",
    description="Secure API with Better Auth JWT tokens",
    version="1.0.0"
)

@app.get("/")
def home():
    return {"message": "Public route - no authentication required"}

@app.get("/protected-route")
def protected_route(current_user: Dict[Any, Any] = Depends(get_current_user)):
    """Requires valid JWT from Better Auth."""
    return {
        "message": f"Hello {current_user.get('sub', 'user')}! Access granted.",
        "user_info": {
            "id": current_user.get("sub"),
            "email": current_user.get("email"),
            "name": current_user.get("name"),
        }
    }

@app.get("/api/users/{user_id}/tasks")
def get_user_tasks(
    user_id: str,
    current_user: Dict[Any, Any] = Depends(get_current_user)
):
    """
    User isolation example: users can only access their own data.
    """
    authenticated_user_id = current_user.get("sub")

    # Verify user can only access their own data
    if authenticated_user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: You can only access your own data"
        )

    # Return user's tasks (in real app, query database)
    return {
        "user_id": user_id,
        "tasks": [
            {"id": 1, "title": "Sample Task", "completed": False},
            {"id": 2, "title": "Another Task", "completed": True}
        ]
    }
```

## Step 5: Connect Next.js Frontend to FastAPI

### Create API Client Utility

Create `lib/api.ts`:

```typescript
import { auth } from "./auth";

/**
 * Create authenticated API client with JWT token
 */
export async function createApiClient() {
  const session = auth.client.getSession();

  if (!session?.token) {
    throw new Error("User not authenticated");
  }

  return {
    /**
     * Make authenticated request to FastAPI backend
     */
    async request<T>(endpoint: string, options: RequestInit = {}) {
      const token = session.token;

      const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return response.json() as Promise<T>;
    }
  };
}

/**
 * Example: Fetch data from protected endpoint
 */
export async function fetchProtectedData() {
  try {
    const apiClient = await createApiClient();
    const data = await apiClient.request("/protected-route");
    return data;
  } catch (error) {
    console.error("Error fetching protected data:", error);
    throw error;
  }
}
```

### Example Component with Protected API Call

Create `components/ProtectedComponent.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { fetchProtectedData } from "@/lib/api";

export default function ProtectedComponent() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProtectedData();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Protected Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

## Step 6: Configure Environment Variables

### Next.js (.env.local)

```env
DATABASE_URL="your-database-url"
BETTER_AUTH_SECRET="your-secret-key-must-be-at-least-32-characters-long"
NEXT_PUBLIC_FASTAPI_URL="http://localhost:8000"
AUTH_ISSUER="https://your-nextjs-app.com"
AUTH_AUDIENCE="https://api.your-fastapi-app.com"
```

### FastAPI (.env)

```env
BETTER_AUTH_URL="http://localhost:3000"
AUTH_ISSUER="https://your-nextjs-app.com"
AUTH_AUDIENCE="https://api.your-fastapi-app.com"
```

## Run Both Applications

### Start Next.js

```bash
npm run dev
```

### Start FastAPI

```bash
uvicorn app.main:app --reload --port 8000
```

## Security Benefits

| Benefit | How It Helps |
|---------|--------------|
| **User Isolation** | Each user only sees their own data |
| **Stateless Auth** | No need to call frontend for verification |
| **Automatic Expiry** | Tokens expire after 7 days |
| **Independent Verification** | Both services verify auth separately |

## Troubleshooting Common Issues

### "Public key for token not found"
- Check that `/api/auth/jwks` is accessible
- Verify token's `kid` matches a key in JWKS response

### "Invalid or expired token"
- Confirm secrets match between Better Auth and FastAPI
- Check issuer/audience claims are configured correctly

### "User not authenticated"
- Ensure JWT token is in Authorization header
- Verify token hasn't expired

## Key Takeaways

 Better Auth issues JWT tokens when users log in
 FastAPI verifies tokens using Better Auth's public keys
 Users can only access their own data
 No shared session storage needed between services
 Both frontend and backend work independently

This architecture gives you a secure, scalable authentication system that works across your full-stack application.