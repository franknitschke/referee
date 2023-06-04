import useSubmit from '../hooks/useSubmit';
import { useNavigate } from 'react-router';

function Login() {
  const { loading, error, success, fetchData } = useSubmit();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = {};
    for (let [key, value] of formData.entries()) {
      body[key] = value;
    }

    const res = await fetchData('/auth/admin', 'POST', body);
    if (res) {
      localStorage.setItem('token', res.token);
      navigate('/settings');
    }

    return body;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='min-w-full min-h-screen flex items-center justify-center'>
        {
          <div className='flex justify-center items-center'>
            <div className='relative h-full items-center'>
              <div className='artboard artboard-horizontal phone-1 bg-white'>
                <div className='flex flex-col space-y-4 h-full w-full justify-center items-center'>
                  <div className='text-xl'>Login</div>
                  <div>
                    <label className='label'>
                      <span className='label-text'>Benutzer</span>
                    </label>
                    <input
                      type='text'
                      name='user'
                      id='user'
                      placeholder='Benutzer'
                      className='input input-bordered w-full max-w-xs'
                    />
                  </div>
                  <div>
                    <label className='label'>
                      <span className='label-text'>Passwort</span>
                    </label>
                    <input
                      type='text'
                      name='password'
                      id='password'
                      className='input input-bordered w-full max-w-xs'
                    />
                  </div>
                  <div>
                    <button
                      className={`btn ${loading && 'loading'} ${
                        error && 'btn-error'
                      } ${success && 'btn-success'}`}
                      type='submit'
                    >
                      Einlogen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </form>
  );
}

export default Login;
