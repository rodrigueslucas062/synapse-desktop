import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <section className="bg-zinc-800">
      <div className="max-md:hidden bg-violet-900 md:w-1/2 h-full absolute top-0 left-0 rounded-r-2xl">
        <div className="grid place-items-center h-screen">
          <h1>Logo Synapse</h1>
        </div>
      </div>
      <div className="md:w-1/2 w-full h-full absolute top-0 right-0">
        <div className="flex px-10 items-center justify-center h-full">
          {children}
        </div>
      </div>
    </section>
  );
};
