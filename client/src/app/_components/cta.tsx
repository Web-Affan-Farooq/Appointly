import { Button } from "@/components/common";
import { Calendar, Users, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CTA() {
  return (
    <section className="w-full py-20 bg-gradient-to-r from-[#e189fa] via-purple-500 to-[#dbc81d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
                Ready to Transform Your
                <span className="block">Appointment Experience?</span>
              </h2>
              <p className="text-xl text-white/90 leading-relaxed max-sm:text-sm">
                Join thousands of satisfied users who have streamlined their
                appointment management with Appointly. Start your free trial
                today!
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                "Free 14-day trial",
                "No setup fees",
                "Cancel anytime",
                "24/7 customer support",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                  <span className="text-white/90 max-sm:text-sm">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={"/signup-user"}>
                <Button className="flex flex-row flex-nowrap justify-center items-center bg-yellow px-8 py-4 text-lg hover:background-button-hover transition-all duration-200 ease-in-out">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Start as Client</span>
                </Button>
              </Link>
              <Link href={"/create-account"}>
                <Button className="transition-all duration-200 ease-in-out flex flex-row flex-nowrap justify-center items-center text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Join as Provider</span>
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-6 border-t border-white/20">
              <p className="text-white/80 text-sm mb-4 max-sm:text-sm">
                Join 10,000+ users who trust Appointly
              </p>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full">
                  <Image
                    src="/images/profile.jpg"
                    alt="image"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <span className="text-white/90 text-sm self-center ml-2">
                  and thousands more...
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <Image
                src="/images/cta.webp"
                alt="Healthcare professional consultation"
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 animate-bounce">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-[#e189fa]" />
                <span className="text-sm font-medium text-black">Book Now</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 animate-pulse">
              <div className="text-center">
                <div className="text-2xl font-bold text-black">99%</div>
                <div className="text-xs text-gray-600">Satisfaction</div>
              </div>
            </div>

            {/* Background Effects */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
