function Avatar({
  name = "U",
}) {

  return (

    <div
      className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex items-center justify-center font-semibold"
    >

      {name.charAt(0).toUpperCase()}

    </div>

  );

}

export default Avatar;