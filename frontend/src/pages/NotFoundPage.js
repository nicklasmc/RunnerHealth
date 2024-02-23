import './styles/notfound.css';

/*images*/
import first from './imgs/Astro.png';

const NotFoundPage = () => {
  return (
    <div className="invoice page-contents container-fluid">
      <div className="space-can">
        <div>
          <img src={first} alt="..." />
        </div>
        <div>
          <h2 className="nf-title text-2xl">This Page is Lost in Space</h2>
          <p className="nf-text">
            You thought this mission to the moon would be a quick six month
            thing. Your neighbor offered to look after your dog. Your high
            school math teacher was impressed. He once said you wouldn't amount
            to anything.You sure showed him. But now here you are, fifty feet
            from your spaceship with no way to get back. Your dog will be so
            sad. Your math teacher will be so smug. Pretty devastating.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
