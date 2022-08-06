import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
//node.js 모듈
import {remark} from 'remark';
import remarkHtml from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

// console.log('process.cwd()', process.cwd())
// 파일명을 가져옴 (폴더경로)  /nextjs-app

//console.log('postsDirectioy',postsDirectory);
// 경로를 join 해줌 폴더경로/nextjs-app/posts

 export function getSortedPostsData() {
  
  const fileNames = fs.readdirSync(postsDirectory)
  // fs : 파일을 읽거나 하는 모듈
  // console.log(fileNames);
  // ['pre-rendering.md','ssg-ssr.md']
  // 디렉토리를 읽어 배열로 출력됨
  
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    // 파일 이름에서 .md를 삭제한 값이 들어갈 새로운 배열 만듬
    const fullPath = path.join(postsDirectory, fileName);
    // 파일 경로를 다시 join 해줌 
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // utf-8로 인코딩해줌 
    const matterResult = matter(fileContents);
    // gray-matter를 사용 데이터 변경 

    // 
    return {
      id,
      ...matterResult.data as { date: string; title: string }
    }
  })
  
  // 최근 생성된 post 를 위로 올림
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}  

export function getAllPostIds(){
  const fileNames = fs.readdirSync(postsDirectory); // 파일 이름들이 배열로 나옴
  return fileNames.map(fileName =>{
    return{
      params : {
        id: fileName.replace(/\.md$/,"")
      }
    }
  })
}

export async function getPostData(id:string){
  const fullPath = path.join(postsDirectory,`${id}.md`);
  const fileContents = fs.readFileSync(fullPath,'utf-8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
  .use(remarkHtml)
  .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as {date: string; title: string})
  }
}