import { useState, useEffect } from "react"
import { Loader, FormField, Card } from '../components'
import PropTypes from 'prop-types';

const RenderCards = ({ data, title }) => {
  if(data.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
      )
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchedResults, setSearchedResults] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)

  const fetchPost = async () => {
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' 
        },
      })

      if (response.ok) {
        const result = await response.json()

        setAllPosts(result.data.reverse())
      }
    
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchPost()
  },[])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };


  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">The Community Showcase</h1>
        <p className="mt-2 text-[#666e65] text-[14px] m-w[500px]">Browse through a collection of imaginative and visually stunning images genarated by DALL-E AI</p>
      </div>
      <div className="mt-16">
        <FormField
        labelName='Search Post'
        type='text'
        name='text'
        placeholder='Search Posts'
        value={searchText}
        handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
         ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e65] text-xl mb-3">
                Showing Results <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:gid-col-4 sm:grid-col-3 xs:grid-col-3 grid-col-1 gap-3">
             {searchText ? (
              <RenderCards data={searchedResults} title='No Search Results Found'/>
             ) : (
              <RenderCards data={allPosts} title='No Posts Found'/>
             )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

RenderCards.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string
};

export default Home