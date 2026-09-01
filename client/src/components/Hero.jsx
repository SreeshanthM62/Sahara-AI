import React from "react";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[url('/gradientBackground.png')] bg-cover bg-center bg-no-repeat px-5 sm:px-10 lg:px-20">

            {/* Background Blur */}
            <div className="absolute -top-32 -left-32 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-purple-300/30 blur-3xl" />
            <div className="absolute -top-20 -right-24 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-blue-300/30 blur-3xl" />
            <div className="absolute -bottom-32 left-1/2 h-64 w-64 sm:h-96 sm:w-96 -translate-x-1/2 rounded-full bg-pink-300/20 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-5xl text-center">

                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                    Create. Enhance.
                    <br />
                    Automate with{" "}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        AI
                    </span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg md:text-xl">
                    All-in-one AI workspace to write, generate, analyze,
                    <br className="hidden sm:block" />
                    and automate your ideas into reality.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row">

                    <button
                        onClick={() => navigate("/ai")}
                        className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                    >
                        Start for free
                    </button>


                </div>

            </div>

        </section>
    );
};

export default Hero;