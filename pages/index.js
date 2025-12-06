/* eslint-disable @next/next/no-img-element */
// Pagina Home
import Head from 'next/head'
import { useState } from 'react'
import { FiLink } from 'react-icons/fi'
import Menu from '../components/Menu'
import Modal from '../components/Modal';

import api from '../services/api';
import { saveLink } from '../services/storeLinks';

export default function Home() {
  const [link, setLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});



  async function handleShortLink() {
    try {
      const response = await api.post('/shorten', {
        long_url: link
      })

      setData(response.data);
      setShowModal(true);

      saveLink('@encurtaLink', response.data)

      setLink('');

    } catch {
      alert('URL Inválida')
      setLink('');
    }
  }

  return (
    <><Head>
      <title>ShortenLinks</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🔗</text></svg>"></link>
    </Head>
      <div className="container-home">

        <div className="logo">
          <img src="/home.svg" alt="home image" />
        </div>

        <div className="area-input">
          <div>
            <FiLink size={24} color='#FFF' />
            <input
              placeholder='Cole seu link aqui...'
              value={link}
              onChange={(event) => setLink(event.target.value)} />
          </div>
          <button onClick={handleShortLink}>Gerar Link!</button>
        </div>

        <></><Menu />
        {showModal && (
          <Modal
            closeModal={() => setShowModal(false)}
            content={data} />
        )}

        <footer className="footer"><img src="/footer.gif" alt="footer" width={150} /></footer>
      </div></>
  )
}