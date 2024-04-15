import './styles/notfound.css';

/*images*/
import first from './imgs/Astro.png';

const NotFoundPage = () => {
  return (
    <div className="inventory flex flex-col m-auto items-center min-h-screen bg-white">
    <img src={first} alt="..." className="w-1/4 h-1/4 my-0 mx-auto pt-24 flex flex-col"/>
    <h1 className="mt-24 text-5xl">This Page is Lost in Space</h1>
    <p className="nf-text w-1/2 mt-5 text-2xl">
            You thought this mission to the moon would be a quick six month
            thing. Your neighbor offered to look after your dog. Your high
            school math teacher was impressed. He once said you wouldn't amount
            to anything.You sure showed him. But now here you are, fifty feet
            from your spaceship with no way to get back. Your dog will be so
            sad. Your math teacher will be so smug. Pretty devastating.
    </p>
    </div>
  )
};

export default NotFoundPage;
