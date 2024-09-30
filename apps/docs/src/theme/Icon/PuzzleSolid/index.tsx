import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconPuzzleSolid = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}
    >
      <path
        d="M9.375 4.4475C9.375 4.15167 9.22 3.88417 9.04083 3.64833C8.85426 3.40948 8.752 3.11558 8.75 2.8125C8.75 1.94917 9.58917 1.25 10.625 1.25C11.6608 1.25 12.5 1.95 12.5 2.8125C12.5 3.12 12.3933 3.40667 12.2092 3.64833C12.03 3.88417 11.875 4.15167 11.875 4.4475C11.875 4.72417 12.1067 4.94583 12.3833 4.92917C13.975 4.83417 15.5417 4.64417 17.0767 4.36583C17.1603 4.35068 17.2461 4.35273 17.3289 4.37186C17.4117 4.39099 17.4897 4.42681 17.5582 4.47712C17.6267 4.52742 17.6842 4.59117 17.7272 4.66445C17.7702 4.73773 17.7978 4.81902 17.8083 4.90333C17.9969 6.4108 18.1015 7.92758 18.1217 9.44667C18.1224 9.51927 18.1088 9.59129 18.0814 9.65856C18.0541 9.72582 18.0137 9.78698 17.9625 9.83848C17.9113 9.88997 17.8504 9.93077 17.7833 9.9585C17.7162 9.98623 17.6443 10.0003 17.5717 10C17.2767 10 17.0092 9.845 16.7733 9.66583C16.5345 9.47926 16.2406 9.377 15.9375 9.375C15.075 9.375 14.375 10.2142 14.375 11.25C14.375 12.2858 15.075 13.125 15.9375 13.125C16.245 13.125 16.5317 13.0183 16.7733 12.8342C17.0092 12.655 17.2767 12.5 17.5725 12.5C17.8308 12.5 18.0367 12.7183 18.0175 12.9758C17.9197 14.3291 17.7542 15.6766 17.5217 17.0133C17.4996 17.1401 17.4389 17.2569 17.3479 17.3479C17.2569 17.4389 17.1401 17.4996 17.0133 17.5217C15.4967 17.7858 13.9525 17.9658 12.3842 18.0567C12.3185 18.0602 12.2528 18.0503 12.1911 18.0275C12.1294 18.0047 12.0729 17.9696 12.0253 17.9243C11.9776 17.879 11.9397 17.8244 11.9139 17.7639C11.888 17.7034 11.8748 17.6383 11.875 17.5725C11.875 17.2767 12.03 17.0092 12.2092 16.7733C12.3933 16.5317 12.5 16.245 12.5 15.9375C12.5 15.075 11.6608 14.375 10.625 14.375C9.58917 14.375 8.75 15.075 8.75 15.9375C8.75 16.245 8.85667 16.5317 9.04083 16.7733C9.22 17.0092 9.375 17.2767 9.375 17.5725C9.37525 17.644 9.36114 17.7148 9.33351 17.7808C9.30589 17.8467 9.2653 17.9064 9.21417 17.9564C9.16303 18.0064 9.10239 18.0456 9.03583 18.0717C8.96926 18.0978 8.89814 18.1102 8.82667 18.1083C7.51484 18.0713 6.20555 17.9712 4.90333 17.8083C4.81902 17.7978 4.73773 17.7702 4.66445 17.7272C4.59117 17.6842 4.52742 17.6267 4.47712 17.5582C4.42681 17.4897 4.39099 17.4117 4.37186 17.3289C4.35273 17.2461 4.35068 17.1603 4.36583 17.0767C4.61 15.7317 4.78583 14.3625 4.89 12.9733C4.89436 12.9127 4.88614 12.8517 4.86586 12.7944C4.84557 12.737 4.81365 12.6845 4.77211 12.64C4.73056 12.5956 4.68028 12.5602 4.62443 12.5361C4.56857 12.512 4.50833 12.4997 4.4475 12.5C4.15167 12.5 3.88417 12.655 3.64833 12.8342C3.40667 13.0183 3.12 13.125 2.8125 13.125C1.94917 13.125 1.25 12.2858 1.25 11.25C1.25 10.2142 1.95 9.375 2.8125 9.375C3.12 9.375 3.40667 9.48167 3.64833 9.66583C3.88417 9.845 4.15167 10 4.4475 10C4.51999 10.0003 4.59183 9.98625 4.65883 9.95856C4.72582 9.93087 4.78665 9.89013 4.83775 9.83872C4.88886 9.7873 4.92922 9.72624 4.95651 9.65907C4.98379 9.59191 4.99744 9.51999 4.99667 9.4475C4.97844 8.10511 4.89221 6.7645 4.73833 5.43083C4.72743 5.33729 4.7378 5.2425 4.76868 5.15353C4.79956 5.06457 4.85015 4.98373 4.91666 4.91706C4.98317 4.85039 5.06388 4.79961 5.15277 4.76852C5.24167 4.73742 5.33643 4.72682 5.43 4.7375C6.54917 4.86667 7.6825 4.94917 8.8275 4.9825C8.89886 4.9844 8.96988 4.97195 9.03634 4.94589C9.1028 4.91983 9.16336 4.8807 9.21441 4.83081C9.26547 4.78092 9.30599 4.72128 9.33358 4.65544C9.36116 4.5896 9.37525 4.51889 9.375 4.4475Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconPuzzleSolid;
