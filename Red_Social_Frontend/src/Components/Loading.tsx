
export default function Loading() {

    return (
        <div>
            <div className="relative flex  animate-pulse gap-2 p-4">
                <div className="h-12 w-12 rounded-full bg-slate-400"></div>

                <div className="flex-1 ">

                    <div className=" mb-1 h-5  rounded-lg bg-slate-400 text-lg"></div>

                    <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
                </div> 

                <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>

            </div>
        </div>
    )
}
 

export function LoadingLogin() {

    return (
        <div>
            <div className="text-center">
                <div
                    className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
                ></div>
                <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Your adventure is about to begin
                </p>
            </div>

        </div>
    )
}