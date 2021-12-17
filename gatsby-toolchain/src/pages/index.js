import * as React from "react";
import Layout from "../components/layout";
import SidebarRoot from "../components/Sidebar";

const IndexPage = () => {
  return (
    <Layout>
      <h1>Home Page</h1>
      <SidebarRoot data={[{label: 'heading', link: 'href', level: 1, content: 'none' },
        { label: 'heading-two', link: 'href-2', level: 3, content: [
          {label: 'heading', link: 'href', level: 1, content: 'none' },
        { label: 'heading-two', link: 'href-2', level: 3, content: 'hello' }
          ]}]} />
    </Layout>
  )
}

export default IndexPage
