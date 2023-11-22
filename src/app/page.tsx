import { Timer } from "@/components/Timer/Timer"

export default function Home() {
  return (
    <main className="flex-col flex items-center justify-center h-screen w-screen">
          <h1 className="text-4xl font-bold text-white mb-5">Timer App</h1>
          <h2 className="mb-3 text-xl text-white">Here you can set a timer for a certain number of minutes and seconds</h2>
        <Timer/>
          <h3 className="mt-10 text-xl text-white">Simply enter the desired time period and press <b>Start</b></h3>
    </main>
  )
}
