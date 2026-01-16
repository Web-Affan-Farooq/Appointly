"use client";

import React, { useState } from "react";
import { IconEyeOff, IconEye } from "@tabler/icons-react";
import Input from "./input";

const PasswordInput = ({
	...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
	const [show, setShow] = useState(false);
	return (
		<div className="flex flex-row flex-nowrap items-center gap-[10px]">
			<Input type={show ? "text" : "password"} {...props} placeholder="....." />
			{show ? (
				<IconEye
					onClick={() => setShow(!show)}
					className="size-6 cursor-pointer"
				/>
			) : (
				<IconEyeOff
					onClick={() => setShow(!show)}
					className="size-6 cursor-pointer"
				/>
			)}
		</div>
	);
};
export default PasswordInput;
