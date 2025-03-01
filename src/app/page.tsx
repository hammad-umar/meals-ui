import { NextPage } from 'next';

import { Button } from '@/components/ui/button';

const HomePage: NextPage = () => {
  return (
    <div>
      <h1 className="text-red-900 text-4xl">Home Page</h1>
      <Button>Hello</Button>
    </div>
  );
};

export default HomePage;
