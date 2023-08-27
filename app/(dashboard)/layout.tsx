import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

const Dashboardlayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();

  return (
    <div className='relative h-full'>
      <div className=' hidden h-full bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col'>
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className='md:pl-72'>
        <Navbar apiLimitCount={apiLimitCount} />
        {children}
      </main>
    </div>
  );
};

export default Dashboardlayout;
