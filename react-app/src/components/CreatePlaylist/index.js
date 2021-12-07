// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { addPlaylist } from '../../store/playlist';
// import { useHistory } from 'react-router';



// const CreatePlaylist = () => {
  
//   const [name, setName] = useState('');
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [address, setAddress] = useState('');
//   const [imgUrl, setImgUrl] = useState('');
//   const [description, setDescription] = useState('');
//   const [errors, setErrors] = useState([]);
//   const history = useHistory()
//   const dispatch = useDispatch();
  
//   const sessionUser = useSelector((state) => state.session.user)
//   if(!sessionUser) {
//     // history.push('/');
//     return <Redirect to="/" />;
//   }
  
//   const id = sessionUser.id

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);
//     const payload = {
//       name,
//       ownerId: id,
//       state,
//       city,
//       address,
//       imgUrl,
//       description
//     };
//     //dispatch(addSpot(payload));
//     dispatch(addPlaylist(payload)).catch(
//       async (res) => {
//         const data = await res.json();
//         if (data && data.errors) {
//           setErrors(data.errors)
//         } 
//       } 
//     );

    
//     if (name, state, city, address, description) {
//       history.push('/mySpots');
//     }
    
//   };

  

//   return (
//     <div className='div-wrapper'>
//       <h3 className='header'>Add A Spot</h3>
//       <form onSubmit={handleSubmit} >
//       <div>
//           <label>
//             <input
//               className = 'login-input'
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               placeholder='Spot Name'
//             />
//           </label>
//         </div>
//         {/* <div>
//           <label>
//             <input
//               className = 'login-input'
//               onChange={(e) => setOwnerId(e.target.value)}
//               value={ownerId}
//               placeholder='ownerId'
//             />
//           </label>
//         </div> */}
//         <div>
//           <label>
//             <input
//               className = 'login-input'
//               onChange={(e) => setState(e.target.value)}
//               value={state}
//               placeholder='State'
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             <input
//               className = 'login-input'
//               onChange={(e) => setCity(e.target.value)}
//               value={city}
//               placeholder='City'
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             <input
//               className = 'login-input'
//               onChange={(e) => setAddress(e.target.value)}
//               value={address}
//               placeholder='Address'
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             <input
//               className = 'login-input'
//               onChange={(e) => setImgUrl(e.target.value)}
//               value={imgUrl}
//               placeholder='Image URL'
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             <input
//               className = 'login-input'
//               onChange={(e) => setDescription(e.target.value)}
//               value={description}
//               placeholder='Spot Description'
//             />
//           </label>
//         </div>
//         <button className='button-login' type='submit'>
//           Add Spot
//         </button>
//       </form>
//       <ul>
//         {errors.map((error, idx) => (
//           <li className='error-text' key={idx}>{error}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default CreateSpot;