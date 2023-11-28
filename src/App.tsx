import { useState } from 'react'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from './components/ui/use-toast'

function App() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState<string[]>([])
  const { toast } = useToast()

  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const onAdd = () => {
    const convertUrl = getCleanUrl(url)
    setResult([...result, convertUrl])
    setUrl("")
  }

  const getCleanUrl = (url: string) => {
    return url.replace(/#.*$/, '').replace(/\?.*$/, '');
  };

  const copyUrl = (url: string) => () => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Copied!",
      description: "The URL has been copied to your clipboard.",
      duration: 3000,
    })
  }

  const resultUrl = getCleanUrl(url)

  return (
    <div className='p-10'>

    <div className='flex flex-col gap-10'>
      <div className="flex justify-between w-full items-center space-x-2 flex-1">
        <Input placeholder='Paste your URL' className='flex-1' value={url} onChange={onChange} />
        <Button onClick={onAdd}>
          Add
        </Button>
      </div>
      <div className='flex relative'>
        <Input value={resultUrl} disabled />
        <Button className='absolute top-[2px] right-[2px]' size="sm" onClick={copyUrl(resultUrl)}>
          Copy URL
        </Button>
      </div>

      <div className='flex flex-col items-start'>
        <h1 className='text-2xl font-bold mb-4'>History</h1>
        <div className="flex gap-2 flex-col w-full">
        {
          result.map((item, index) => (
            <div key={index} className='flex relative w-full'>
              <Input value={item} disabled />
              <Button className='absolute top-[2px] right-[2px]' size="sm" onClick={copyUrl(item)}>
                Copy URL
              </Button>
            </div>
          ))
        }
        </div>
      </div>
    </div>
    <Toaster />
    </div>
  )
}

export default App
