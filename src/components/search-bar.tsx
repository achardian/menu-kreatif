const SearchBar = () => {
  return (
    <form className='flex-1 bg-gray-50 rounded-full'>
      <input
        type='text'
        placeholder='Cari resep disini'
        className='w-full outline-none border-none py-3 px-5 bg-transparent'
      />
    </form>
  );
};

export default SearchBar;
