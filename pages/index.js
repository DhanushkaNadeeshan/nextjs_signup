import { useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';


export default function Home() {

  const router = useRouter();
  const refUserName = useRef(null);
  const refPassword = useRef(null);

  const loginHandler = (e) => {
    // stop page refresh after submit data
    e.preventDefault();
    // create send data object
    const data = {
      userName: refUserName.current.value.trim(),
      password: refPassword.current.value.trim()
    }
    fetch('/api/login', {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("🚀 ~ file: index.js ~ line 24 ~ .then ~ responseJson", responseJson)
        if(responseJson.success){
          router.push('/protect')
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }

  const ping = () => {
    fetch('/api/ping').
      then((response) => response.json()).
      then((result) => {
        console.log("🚀 ~ file: index.js ~ line 38 ~ then ~ result", result)
       

      }).catch(error => {
        console.error(error);
      })
  }

  return (
    <div>
      <Head>
        <title>Next JS - Authentication</title>
        <meta name="description" content="Simple Nextjs App With Authentication" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>Login</p>
        <form onSubmit={loginHandler}>
          {/* user name */}
          <div className='form'>
            <label>User Name</label>
            <input type="text" placeholder='User Name' required ref={refUserName} />
          </div>
          {/* password */}
          <div className='form'>
            <label>Password</label>
            <input type="password" placeholder="Password" required ref={refPassword} />
          </div>
          <div className='form'>
            <button type="button" onClick={() => router.push('/signup')}>Sign Up</button>
            <button type='submit'>Login</button>
          </div>
        </form>

        <button onClick={ping}>Get Cookie</button>
        <button onClick={()=>router.push('/protect')}>Try to Go protect</button>
      </main>
      <footer className="footer">
        <p>Made by gitportal.dev</p>
      </footer>
    </div>
  )
}
