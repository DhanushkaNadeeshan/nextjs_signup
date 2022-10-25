import { useRef } from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';


export default function SignUp() {

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
    fetch('/api/signin', {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("🚀 ~ file: index.js ~ line 24 ~ .then ~ responseJson", responseJson)
      })
      .catch((error) => {
        console.error(error);
      });

  }

  return (
    <div>
      <Head>
        <title>Next JS - Authentication</title>
        <meta name="description" content="Simple Nextjs App With Authentication" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>Sign-Up</p>
        <form onSubmit={loginHandler}>
          {/* user name */}
          <div className='form'>
            <label>User Name</label>
            <input type="text" placeholder='User Name'  required ref={refUserName} />
          </div>
          {/* password */}
          <div className='form'>
            <label>Password</label>
            <input type="password" placeholder="Password" required  ref={refPassword}/>
          </div>
          <div className='form'>
            <button type="button" onClick={()=>router.push('/')}>Login</button>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </main>
      <footer className="footer">
        <p>Made by gitportal.dev comunity</p>
      </footer>
    </div>
  )
}
