import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/post'
import homeStyles from '../styles/Home.module.css'

const Home = ({allPostsData}: {
  allPostsData:{
    date: string,
    title: string,
    id: string
  }[] // [] 배열안에
}) => {
  return (
    <div className={homeStyles.containner}>
      <Head>
        <title>Hanyoung_KO&apos;s  blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[Next.js + Typescript 기초 적용 블로그 입니다.]</p>
        <p>
          (This is a website)
        </p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
          <h2 className={homeStyles.headingLg} >markdown file load</h2>
          <ul className={homeStyles.list}>
            {allPostsData.map(({id,title,date})=>(
              <li className={homeStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                <a>{title}</a>
                </Link>
                <br/>
                <small className={homeStyles.lightText}>
                  {date}
                </small>
              </li>
            ))}
          </ul>
      </section>
    </div>
  )
}


export default Home


export const getStaticProps: GetStaticProps = async ()=>{
  const allPostsData = getSortedPostsData();
  return{
    props:{
      allPostsData
    }
  }
}