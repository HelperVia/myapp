

const AuthStepItem= (props)=>{


    return(
        <div>
            <div className={(props.active ? "bg-hv-color-7":"bg-white")+" flex items-center justify-center w-16 h-16 mx-auto border-2 border-gray-200  rounded-full shadow"}>
                <span className={(props.active ? "text-white":"text-gray-700")+" text-xl font-semibold  "}>{props.label}</span>
            </div>
            <h3
                className="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900  md:mt-10">
                {props.title}
            </h3>
            <p className="mt-3 sm:mt-4 text-base text-gray-600 ">
                {props.description}
            </p>
        </div>
    )
}

export default AuthStepItem;
