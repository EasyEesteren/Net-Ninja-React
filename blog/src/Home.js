import Bloglist from './Bloglist';
import useFetch from './useFetch';


const Home = () => {

    const {blogs, isPending, error} = useFetch('http://localhost:8000/blogss');
    const handleClick = () => {
        console.log("Hello there")
    }
    
    // {blogs && ...} is an example of how we can do conditional templating in react
    // the left side of the conditional 'blogs' is evauated first and if it is null then the 
    // right side after && is not evaluated
    return (
      <div className="home">
        <h2>Homepage</h2>
        {error && <div> { error } </div>}
        {isPending && <div>Loading... </div> }
        {blogs && <Bloglist blogs={blogs} title="All blogs"/>}
        <button onClick={handleClick}>Click Me</button>
        {blogs && <Bloglist blogs = {blogs.filter((blog) => blog.author == "mario")} title="Mario's blogs"/>}
      </div>
    );
  }
   
  export default Home;