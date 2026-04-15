## Deploy Express JS Application On Hugging Face For Free :

In this guide we'll cover the deployment of ExpressJS backend application on hugging face using docker and github actions .


# Step 1 Configuration :
Add the following yaml configuration in the `README.md` file , make sure this file should be placed in the same directory where your backend src code exists .

```markdown
---
title: My Express API
emoji: 🚀
colorFrom: blue
colorTo: purple
sdk: docker
app_port: 7860
pinned: false
---
```

# Step 2 | Dockerize the application :
Check out [This dockerfile](../server/Dockerfile) for reference .

Make sure to run the application on your local machine first .

Also make sure to use .dockerignore for ignore extra large folders like node modules .

# Step 3 | Setup CI/CD using github actions :

Use the following template for github action's `deploy.yml` file 

```yaml
name: Deploy to Hugging Face Spaces

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy-to-hf:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          lfs: true
      
      - name: Prepare server directory for deployment
        run: |
          # Create a temporary directory for deployment
          mkdir -p deploy_temp
          # Copy only the server directory contents to deploy_temp
          cp -r YOUR_BACKEND-DIRECTORY/* deploy_temp/
          # Copy any necessary root-level files if needed (like .gitignore)
          # cp .gitignore deploy_temp/ || true
          
          # Navigate to deploy_temp and initialize git
          cd deploy_temp
          git init -b main
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add .
          git commit -m "Deploy server to Hugging Face Spaces"
      
      - name: Push to Hugging Face Space
        env:
          HF_USERNAME: ${{ secrets.HF_USERNAME }}
          HF_SPACE_NAME: ${{ secrets.HF_SPACE_NAME }}
          HF_TOKEN: ${{ secrets.HF_TOKEN }}
        run: |
          # Navigate to the deployment directory
          cd deploy_temp
          
          # Construct the remote URL using environment variables
          git remote add space https://${HF_USERNAME}:${HF_TOKEN}@huggingface.co/spaces/${HF_USERNAME}/${HF_SPACE_NAME}
          
          # Force push to the space
          git push --force space main
          
          # Optional: remove the remote to clean up
          git remote remove space
      
      - name: Clean up
        run: |
          # Remove temporary directory
          rm -rf deploy_temp

```

# Step 4 | Adding remote configuration :
- Go to hugging face dashboard 
- open your account settings 
- in the left sidebar , click **Access Tokens**
- Click Create new token 
- give it a suitable name , copy and save its value for later use .

# Step 5 | Remote hugging face space :
In the top bar , click spaces -> New space.
- Enter space name 
- Enter short description and license (totally optional)
- Select docker as space SDK
- Choose blank docker template 
- Space hardware should be CPU basic or nvidia machines (only available if you're a paid user)
- Select public
- Click Create space .
- Then go to your hugging face profile , there your space will be shown .
- Open your space , Go to settings on the top bar , scroll down and you'll see **Variables and Secrets** section 
- On the right side , click **New secret** and add all your backen env variables here . Don't add any env variable to variable , because it will be exposed to other hugging face users .


# Step 6 | Configuring Github Secrets :
- Open you repository on github 
- open repository settings 
- in the left side bar , click Secrets and variables -> Actions

- Add the following repository secrets here 
    - **HF_TOKEN** access token you've just copied from hugging face settings .
    - **HF_USERNAME** Your hugging face user name
    - **HF_SPACE_NAME**  Name of your space you've just created .

# Step 7 | Push :
- Push your code to main branch of your repository .
- Wait for a minute , then open your hugging face profile . Check the spaces section and you'll see a new space , click on it .
- below the top bar , you'll se three menu dots click on it , click embed this space .
- Copy the url shown .
- Use this url for calling you endpoints .


## Important configurations :
- Youe express app should allow the frontend URL .
- Your express application must use port 7860 even for local development .
- Your docker container should also expose the same port 
- If you see the above README.md configuration we've talked about above , there is also port 7860 is mentioned and if any thing should not access the port , your application will not run even after successfully deployed to the space . 