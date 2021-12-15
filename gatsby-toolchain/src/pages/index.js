import * as React from "react"
import Meganav from "@ably/ui/core/Meganav";

// markup
const IndexPage = () => {
  return (
    <main>
      <title>Home Page</title>
      <header>
        <Meganav paths={{}}/>
        <h1 className="text-3xl font-bold underline">Home Page</h1>
      </header>
    </main>
  )
}

export default IndexPage
