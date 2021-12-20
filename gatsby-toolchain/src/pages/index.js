import * as React from "react";
import Layout from "../components/layout";
import Sidebar from "../components/Sidebar";

const IndexPage = () => {
  return (
    <Layout>
      <Sidebar data={[{label: 'heading', link: 'href', level: 1, content: 'more-example-content' },
        { label: 'heading-two', link: 'href-2', level: 3, content: [
          {label: 'heading', link: 'href', level: 1, content: 'example-content' },
        { label: 'heading-two', link: 'href-2', level: 3 }
          ]}]} />
    </Layout>
  )
}

export default IndexPage
