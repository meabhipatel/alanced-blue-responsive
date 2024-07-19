// import React from 'react'

// const StarRating = ({rating}) => {
//     // Convert rating to nearest whole number
//     const roundedRating = Math.round(rating);
  
//     return (
//       <div className="inline-block">
//         {/* Render filled stars */}
//         {Array.from({ length: roundedRating }).map((_, index) => (
//           <span key={index} className="text-[16px] text-[#FFC107]">★</span>
//         ))}
  
//         {/* Render empty stars */}
//         {Array.from({ length: 5 - roundedRating }).map((_, index) => (
//           <span key={index + roundedRating} className="text-[16px] text-gray-300">★</span>
//         ))}
        
//         <p className='font-inter opacity-50 text-[#0A142F] text-[14px] inline-block mx-1'>{rating}</p>
//       </div>
//     );
//   }
  

// export default StarRating


import React from 'react'

const StarRating = ({rating}) => {
    // Convert rating to nearest whole number without rounding up
    const wholeRating = Math.floor(rating);
  
    // Format rating with one decimal point
    const formattedRating = rating.toFixed(1);

    // Check if there's a half-star
    const hasHalfStar = rating - wholeRating !== 0;
  
    return (
      <div className="inline-block">
        {/* Render filled stars */}
        {Array.from({ length: wholeRating }).map((_, index) => (
          <span key={index} className="text-[16px] text-[#FFC107] mr-0.5"><i class="bi bi-star-fill text-xs"></i></span>
        ))}
  
        {/* Render half star if applicable */}
        {hasHalfStar && (
          <span className="text-[16px] text-[#FFC107] mr-0.5"><i class="bi bi-star-half text-xs"></i></span>
        )}

        {/* Render empty stars */}
        {Array.from({ length: 5 - wholeRating - (hasHalfStar ? 1 : 0) }).map((_, index) => (
          <span key={index + wholeRating} className="text-[16px] text-gray-300 mr-0.5"><i class="bi bi-star text-xs"></i></span>
        ))}
        
        <p className='font-inter opacity-50 text-[#0A142F] text-[14px] inline-block mx-1'>{formattedRating}</p>
      </div>
    );
}

export default StarRating;
