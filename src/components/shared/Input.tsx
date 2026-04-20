import { classMerge } from "../../utils/classMerge"

type Props = React.ComponentProps<"input"> & {
    legend?: string
}

export function Input({ legend, type="text", className, ...rest}: Props){
    return(
        <fieldset className="flex flex-1 max-h-20  text-gray-400 focus-within:text-green-200">
            {legend && <legend className="uppercase text-xxs mb-2 text-inherit">
                {legend}
                </legend>}
            <input type={type} className={classMerge("w-full h-12 rounded-lg border border-gray-300 px-4 text-sm text-gray-400 bg-transparent outline-none focus:border-2 focus:border-green-200 placeholder-gray-300", className)} {...rest} />
        </fieldset>
    )
}