import { Card } from "../components/Card";
import { useBlogs } from "../hooks/Blogs";

export const Featured = ({searchQuery}:{searchQuery: string}) => {
  const { blogs, loading } = useBlogs();

  const skeletonData = Array(6).fill({sample:'karthik'});
  
   
  const filteredBlogs = blogs.filter(blog=>
    blog?.title?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-250">
      
        {loading
        ?
        <div className="grid grid-cols-3 h-full gap-10">{ (skeletonData.map((blog,index)=>(
          <Card 
            key={loading ? `skeleton-${index}` : blog.id}
            cardType="Featured" 
            blogId={loading ? undefined : blog.id} 
            date={loading ? undefined : blog.createdAt.slice(0,10)} 
            title={loading ? undefined : blog.title}
            firstimageurl={loading ? undefined : blog.firstImageUrl}
            author={loading ? undefined : blog.author}
            loading={loading}
          />
            )))
          }
        </div>
        :(
          filteredBlogs.length>0
          ?
          <div className="grid grid-cols-3  h-full gap-10">{
            filteredBlogs.map((blog) => (
                <Card 
                  key={blog.id}
                  cardType="Featured" 
                  blogId={loading ? undefined : blog.id} 
                  date={loading ? undefined : blog.createdAt.slice(0,10)} 
                  title={loading ? undefined : blog.title}
                  firstimageurl={loading ? undefined : blog.firstImageUrl}
                  author={loading ? undefined : blog.author}
                  loading={loading}
                />
              ))
            }
          </div>
          :( 
            <div className="flex group:w-full h-40 justify-center items-center">
              <h1>No Data found...</h1>
            </div>
          )
        )
      }
      </div>
  
  );
};
