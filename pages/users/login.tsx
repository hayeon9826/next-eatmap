import { useEffect } from 'react';

import Layout from '@/components/Layout';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [router, status]);

  return (
    <Layout>
      <div className="flex h-[80vh] flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-blue-800 text-center text-2xl font-semibold italic">
            eatmap
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-600">
            구글 계정으로 로그인해주세요
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            계정이 없다면 자동으로 회원가입이 진행됩니다.
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-2 px-2 !outline-none focus:border-blue-300 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  비밀번호
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-2 px-2 !outline-none focus:border-blue-300 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                로그인
              </button>
            </div>
          </form> */}

          {/* <p className="mt-10 text-center text-sm text-gray-500">
            계정이 없으신가요?
            <Link
              href="/users/signin"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500 ml-2"
            >
              회원가입 하러가기
            </Link>
          </p> */}
          <div>
            <button
              type="button"
              onClick={() => signIn('google')}
              className="text-white relative group flex bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
              </span>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
