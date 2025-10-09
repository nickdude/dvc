import React from "react";
import BlueButton from "./buttons/BlueButton";

const PlanCard = ({ title, price, subtitle, onContinue, disabled }) => {
    return (
        <div className="flex items-start flex-col justify-center bg-white shadow-[0px_0px_8px_0px_#1D1D1F08] p-6 rounded-2xl w-[294px] gap-6">
            <h2 className="text-lg font-bold text-black font-inter">{title}</h2>
            <h2 className="text-4xl font-bold">
                ${price}{" "}
                <span className="font-normal text-xs text-semiLightGrey">
                    {subtitle}
                </span>
            </h2>
            <p className="text-base text-semiLightGrey">
                {price === "0"
                    ? "Free Trial"
                    : `Equal to $${(price / 12).toFixed(2)}/mo`}
            </p>

            <BlueButton
                label={disabled ? "Already Purchased" : "Continue"}
                width="w-full"
                onClick={onContinue}
                disabled={disabled}
            />
        </div>
    );
};

export default PlanCard;
