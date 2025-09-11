import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface Props {
  username: string;
  verifyUrl: string;
}
const AccountVerificationEmail = ({ username, verifyUrl }: Props) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Verify your account to get started</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto px-[48px] py-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[32px] font-bold text-gray-900 m-0 mb-[16px]">
                Verify Your Account
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                Welcome! {username} Please verify your email address to complete
                your account setup.
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                Hi there,
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                Thanks for signing up! To ensure the security of your account
                and complete the registration process, please verify your email
                address by clicking the button below.
              </Text>

              {/* Verification Button */}
              <div className="text-center mb-[32px]">
                <Button
                  href={verifyUrl}
                  className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                >
                  Verify My Account
                </Button>
              </div>

              <Text className="text-[14px] text-gray-600 mb-[24px] leading-[20px]">
                If the button doesn't work, you can also copy and paste this
                link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 mb-[24px] break-all">
                {verifyUrl}
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                This verification link will expire in 24 hours for security
                reasons.
              </Text>

              <Text className="text-[16px] text-gray-700 leading-[24px]">
                If you didn't create an account, please ignore this email or
                contact our support team.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[32px]">
              <Text className="text-[14px] text-gray-500 text-center mb-[16px]">
                Best regards,
                <br />
                Appointly Team
              </Text>
              <Text className="text-[12px] text-gray-400 text-center m-0 mb-[8px]">
                123 Business Street, Suite 100
              </Text>
              <Text className="text-[12px] text-gray-400 text-center m-0 mb-[16px]">
                Karachi, Pakistan
              </Text>
              <Text className="text-[12px] text-gray-400 text-center m-0">
                © Appointly 2025 . All rights reserved. |
                <Button
                  href="#"
                  className="text-gray-400 underline text-[12px] ml-[4px]"
                >
                  Unsubscribe
                </Button>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default AccountVerificationEmail;
