export default function Title({title}:{title:React.ReactNode}) {
  if(typeof title !== 'string') {
    return title
  }

  const titleWords = title.split(' ')

  return <>{titleWords.map((word,i)=>{

    if(i !== 0 && word.toLowerCase().startsWith('t')) {
      return <>{' '}<span className="w-0 inline-block">&nbsp;</span>{' '}{word}</>
    }

    return <>{' '}{word}</>
  })}</>


}