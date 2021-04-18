import React, {useState, useMemo} from 'react';
import api from '../../services/api';
import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({history}) {

  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');


  const preview = useMemo(
    () => {
      return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]
  )

  async function handleSubmit(evt) {
    evt.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem('user');
    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id }
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
      id="thumbnail"
      style={{ backgroundImage: `url(${preview})`}}
      className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="small camera icon" />
      </label>


      <label htmlFor="company">COMPANY *</label>
      <input
        type="text"
        id="company"
        value={company}
        onChange={event=> setCompany(event.target.value)}
        placeholder="Your company..."
      />

      <label htmlFor="techs">TECHNOLOGIES *</label>
      <input
        type="text"
        id="techs"
        value={techs}
        onChange={event=> setTechs(event.target.value)}
        placeholder="Which technologies are used?"
      />

      <label htmlFor="price">PRICE PER DAY * <span>(Free of charge, leave field blank)</span></label>
      <input
        type="text"
        id="price"
        value={price}
        onChange={event=> setPrice(event.target.value)}
        placeholder="How much would you charge per day?"
      />
      <button className="btn">SUBMIT</button>
    </form>
    )
}