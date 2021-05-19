// import Weather from "./weather/weather"
import Post from '../post/post';
import Posts from '../post-list/post-list';
const Home = (props) => {
  return (
    <div className="container" style={{ paddingTop: '10px' }}>
      <div className="row">
        <div className="col">{/* <Weather /> */}</div>
        <div className="col-6">
          <Post />
          <br />
          <Posts filteredPosts={props.filteredPosts} clicked={props.clicked} setClicked={props.setClicked} />
        </div>
        <div className="col">3 of 3</div>
      </div>
    </div>
  );
};

export default Home;
