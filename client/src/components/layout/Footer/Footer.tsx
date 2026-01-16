"use client";
import Link from "next/link";
import {
	IconMail,
	IconPhone,
	IconBrandFacebook,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandX,
	IconMapPin2,
	IconCalendarEvent,
} from "@tabler/icons-react";
import { Input } from "@/components/common";
import { usePathname } from "next/navigation";
import { pagesNotAllowed } from "@/constants";

export function Footer() {
	const pathname = usePathname();
	const companyLinks = [
		{ name: "About Us", href: "#" },
		{ name: "Careers", href: "#" },
		{ name: "Press", href: "#" },
		{ name: "Blog", href: "#" },
	];

	const productLinks = [
		{ name: "Features", href: "#features" },
		{ name: "Pricing", href: "#pricing" },
		{ name: "API", href: "#" },
		{ name: "Security", href: "#" },
	];

	const supportLinks = [
		{ name: "Help Center", href: "#" },
		{ name: "Contact Us", href: "#" },
		{ name: "Status", href: "#" },
		{ name: "Community", href: "#" },
	];

	const legalLinks = [
		{ name: "Privacy Policy", href: "#" },
		{ name: "Terms of Service", href: "#" },
		{ name: "Cookie Policy", href: "#" },
		{ name: "GDPR", href: "#" },
	];

	if (pagesNotAllowed.includes(pathname)) {
		return <></>;
	}
	return (
		<footer className="w-full bg-black text-white">
			{/* Main Footer Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid lg:grid-cols-5 gap-8">
					{/* Company Info */}
					<div className="lg:col-span-2 space-y-6">
						<div className="flex items-center">
							<IconCalendarEvent className="h-8 w-8 mr-2 text-[#e189fa]" />
							<span className="text-2xl font-bold">Appointly</span>
						</div>
						<p className="text-gray-400 leading-relaxed max-w-md max-sm:text-sm">
							The all-in-one platform that connects clients with top-rated
							service providers while automating appointment management for
							businesses.
						</p>

						{/* Contact Info */}
						<div className="space-y-3">
							<div className="flex items-center space-x-3">
								<IconMail className="h-4 w-4 text-[#e189fa]" />
								<span className="text-gray-400 max-sm:text-sm">
									hello@appointly.com
								</span>
							</div>
							<div className="flex items-center space-x-3">
								<IconPhone className="h-4 w-4 text-[#e189fa]" />
								<span className="text-gray-400 max-sm:text-sm">
									+1 (555) 123-4567
								</span>
							</div>
							<div className="flex items-center space-x-3">
								<IconMapPin2 className="h-4 w-4 text-[#e189fa]" />
								<span className="text-gray-400 max-sm:text-sm">
									San Francisco, CA
								</span>
							</div>
						</div>

						{/* Social Media */}
						<div className="flex space-x-4">
							<button className="text-gray-400 hover:text-black cursor-pointer transition-all duration-300 ease-in-out hover:bg-pink hover:text-black cursor-pointer[#e189fa] p-2 border border-pink rounded-full">
								<IconBrandX className="h-5 w-5" size={20} />
							</button>
							<button className="text-gray-400 transition-all duration-300 ease-in-out hover:bg-pink hover:text-black cursor-pointer p-2 border border-pink rounded-full">
								<IconBrandLinkedin className="h-5 w-5" size={20} />
							</button>
							<button className="text-gray-400 transition-all duration-300 ease-in-out hover:bg-pink hover:text-black cursor-pointer p-2 border border-pink rounded-full">
								<IconBrandInstagram className="h-5 w-5" size={20} />
							</button>
							<button className="text-gray-400 transition-all duration-300 ease-in-out hover:bg-pink hover:text-black cursor-pointer p-2 border border-pink rounded-full">
								<IconBrandFacebook className="h-5 w-5" size={20} />
							</button>
						</div>
					</div>

					{/* Company Links */}
					<div>
						<h4 className="font-semibold mb-4">Company</h4>
						<ul className="space-y-3">
							{companyLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className="text-gray-400 hover:text-white transition-colors max-sm:text-sm"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Product Links */}
					<div>
						<h4 className="font-semibold mb-4">Product</h4>
						<ul className="space-y-3">
							{productLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className="text-gray-400 hover:text-white transition-colors max-sm:text-sm"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Support Links */}
					<div>
						<h4 className="font-semibold mb-4">Support</h4>
						<ul className="space-y-3">
							{supportLinks.map((link, index) => (
								<li key={index}>
									<Link
										href={link.href}
										className="text-gray-400 hover:text-white transition-colors max-sm:text-sm"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Newsletter Signup */}
				<div className="mt-12 pt-8 border-t border-gray-800">
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div>
							<h4 className="text-xl font-semibold mb-2">Stay Updated</h4>
							<p className="text-gray-400 max-sm:text-sm">
								Get the latest features and industry insights delivered to your
								inbox.
							</p>
						</div>
						<div className="flex space-x-3">
							<Input
								type="email"
								placeholder="Enter your email"
								className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
							/>
							<button className="bg-[#e189fa] hover:bg-[#d175f0] text-black px-6">
								Subscribe
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<div className="text-gray-400 max-sm:text-sm">
							© 2024 Appointly. All rights reserved.
						</div>
						<div className="flex space-x-6">
							{legalLinks.map((link, index) => (
								<Link
									key={index}
									href={link.href}
									className="max-sm:text-sm text-gray-400 hover:text-white transition-colors text-sm"
								>
									{link.name}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
export default Footer;
