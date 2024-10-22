// import React, { useEffect, useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { useCampaign } from '../../components/campaignContext/CampaginContext'; // Corrected import path
// import { useManager } from '../../components/managerContext/ManagerContext'; // Adjust path if necessary
// import NavBar from '../../components/navBar/NavBar';


// import './createCampaign.css';

// const CampaignForm = () => {
//   const { updateCampaign, getCampaignById, getStoresByCampaignId } = useCampaign();
//   const { campaignId } = useParams();
//   const [campaignName, setCampaignName] = useState('');
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [storeOptions, setStoreOptions] = useState([]);
//   const [selectedStores, setSelectedStores] = useState([]);
//   const [selectedAds, setSelectedAds] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const {manager} = useManager();
//   const location = useLocation();
//   const backendBaseUrl = "https://backend:8443";
//   useEffect(() => {
//     if (location.state && location.state.selectedStores){
//       setSelectedStores(location.state.selectedStores);
//     }
//   }, [location.state])

//   useEffect(() => {
//     const fetchStores = async () => {
//       try {
        
//         console.log(manager.id);
//         console.log(manager.brand);
//         const response = await fetch(`${backendBaseUrl}/stores/state/${manager.id}/${manager.brand}`); 
        

//         const data = await response.json();
//         console.log(data);
//         if (Array.isArray(data)) {
//           setStoreOptions(data);
//         } else {
//           console.error('Expected an array but got:', data);
//           setError('Failed to fetch store options');
//         } //
//       } catch (err) {
//         console.error('Failed to fetch stores', err);
//         setError('Failed to fetch store options');
//       }
     
//     };

//     fetchStores();
//   }, []);

//   //Error is here 
//   useEffect(() => {
//     if (campaignId) {
//       const fetchCampaignDetails = async () => {
//         try {
//           const campaignDetails = await getCampaignById(campaignId);
//           if (campaignDetails) {
//             console.log("Liz look here", campaignDetails);
//             setCampaignName(campaignDetails.title);
//             setStartDate(new Date(campaignDetails.startDate));
//             setEndDate(new Date(campaignDetails.endDate));
//           }
//         } catch (err) {
//           console.error('Failed to fetch campaign details', err);
//           setError('Failed to fetch campaign details');
//         }
//       };

//       fetchCampaignDetails();
//     }
//   }, [campaignId, getCampaignById]);

//   useEffect(() => {
//     if (campaignId) {
//       const fetchSelectedStores = async () => {
//         try {
//           const preSelectedStores = await getStoresByCampaignId(campaignId);
//           if (preSelectedStores) {
//             setSelectedStores(preSelectedStores.map(store => store.id)); // Ensure you map to IDs
//             console.log("Stores", preSelectedStores);
//           }
//         } catch (error) {
//           console.error("Failed to fetch pre-selected stores.", error);
//           setError("Failed to fetch pre-selected stores");
//         }
//       };

//       fetchSelectedStores();
//     }
//   }, [campaignId, getStoresByCampaignId]);

//   const formatDate = (date) => {
//     if (!date) return null;
//     const year = date.getFullYear();
//     const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are zero-based
//     const day = (`0${date.getDate()}`).slice(-2);
//     return `${year}-${month}-${day}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       campaignName,
//       startDate: formatDate(startDate),
//       endDate: formatDate(endDate),
//       selectedStores,
//       selectedAds,
//     };

//     await updateCampaign(payload);

//     if (campaignId) {
//       navigate(`/adSelection/campaign/${campaignId}`);
//     } else {
//       navigate('/adSelection');
//     }
//   };

//   const handleDateChange = (dates) => {
//     const [start, end] = dates;
//     setStartDate(start);
//     setEndDate(end);
//   };

//   const handleStoreSelection = (storeId) => {

//     if (selectedStores.includes(storeId)) {
//       setSelectedStores(selectedStores.filter(id => id !== storeId));
//     } else {
//       setSelectedStores([...selectedStores, storeId]);
//     }
//   };

//   const toggleSelectAll = () => {
//     if (selectAll) {
//       setSelectedStores([]); // Clear all selections
//     } else {
//       setSelectedStores(storeOptions.map(store => store.id)); // Select all stores
//     }
//     setSelectAll(!selectAll);
//   };

//   return (
//     <div class="fixDisplay">
//       <NavBar />
//     <form onSubmit={handleSubmit} className="campaign-form">
//       <div className="input-group">
//         <label>Campaign Name:</label>
//         <input
//           type="text"
//           value={campaignName}
//           onChange={(e) => setCampaignName(e.target.value)}
//           required
//         />
//       </div>
//       <div className="input-group">
//         <label>Date Range:</label>
//         <DatePicker
//           selected={startDate}
//           onChange={handleDateChange}
//           startDate={startDate}
//           endDate={endDate}
//           selectsRange
//           dateFormat="yyyy/MM/dd"
//           required
//         />
//       </div>
//       <div className="input-group">
//         <label>Store Selector:</label>
//         <div>
//           <button type="button" onClick={toggleSelectAll} className='buttons-create'>
//             {selectAll ? 'Clear Selection' : 'Select All'}
//           </button>
//         </div>
//         <select
//           multiple
//           value={selectedStores}
//           onChange={(e) => handleStoreSelection(e.target.value)}
//           required
//         >
//           {storeOptions.map((item) => (
//             <option key={item.store.id} value={item.store.id}>
//               {item.store.location}, {item.state.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>} {/* Display error message if error state is set */}
//       <button type="submit" className='buttons-create'>Next</button> {/* Submit button to trigger form submission */}
//     </form>
//     </div>
//   );
// };

// export default CampaignForm;
