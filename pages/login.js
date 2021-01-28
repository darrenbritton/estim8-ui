const Login = ({ playerAdd, setName }) => (
  <div className="text-center">
    <p className="text-2xl">Enter your name</p>
    <div className="py-5">
      <input onInput={(e) => setName(e.target.value.trim())} className="rounded-md shadow-md border-gray-50 border-2 py-2 px-4 mx-2" autoComplete="false" />
      <button
        onClick={playerAdd}
        className="rounded-md shadow-md py-2 px-4 bg-white bg-gradient-to-br text-white from-blue-400 to-blue-600 hover:from-yellow-400 hover:to-yellow-600 transition duration-75 ease-in-out"
        type="button"
      >
        Join
      </button>
    </div>
  </div>
);

export default Login;
