const Loading = () => {
  return (
    <main className='grid grid-cols-1 lg:grid-cols-2 p-5'>
      {Array(10).map((item) => (
        <div>
          <div className='w-full h-[340px] bg-gray-100'></div>
          <div className='py-3 w-full rounded-full bg-gray-100'></div>
        </div>
      ))}
    </main>
  );
};

export default Loading;
