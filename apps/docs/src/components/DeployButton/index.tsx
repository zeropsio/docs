import React from 'react';

interface DeployButtonProps {
    link: string;
    badgeWidth: number;
}

const DeployButton: React.FC<DeployButtonProps> = ({ link, badgeWidth }) => {
    return (
            <a href={`https://app.zerops.io/recipe/${link}`} target="_blank">
                <svg width={badgeWidth} viewBox="0 0 167 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_469_290)">
                        <path d="M151.364 0H15C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30H151.364C159.648 30 166.364 23.2843 166.364 15C166.364 6.71573 159.648 0 151.364 0Z" fill="#7CC6BB" />
                        <path d="M37.6425 14.9988C37.6425 15.8028 37.4927 16.475 37.1933 17.0154C36.8938 17.5525 36.4592 17.9577 35.8895 18.2312C35.3199 18.5014 34.633 18.6365 33.829 18.6365H31.8466V11.4978H34.0439C34.7828 11.4978 35.4208 11.6312 35.9579 11.8982C36.495 12.1619 36.91 12.5541 37.203 13.0749C37.496 13.5925 37.6425 14.2338 37.6425 14.9988ZM36.4218 15.033C36.4218 14.447 36.329 13.9652 36.1435 13.5876C35.9612 13.21 35.691 12.9301 35.3329 12.7478C34.9781 12.5622 34.5403 12.4695 34.0195 12.4695H33.0185V17.655H33.8485C34.7112 17.655 35.3557 17.4353 35.7821 16.9958C36.2086 16.5564 36.4218 15.9021 36.4218 15.033ZM41.2167 13.1286C41.6985 13.1286 42.1119 13.2279 42.457 13.4265C42.802 13.625 43.0673 13.9066 43.2528 14.2712C43.4384 14.6358 43.5312 15.072 43.5312 15.5798V16.195H39.9228C39.9358 16.7191 40.0758 17.1228 40.3427 17.406C40.6129 17.6892 40.9905 17.8308 41.4755 17.8308C41.8205 17.8308 42.1298 17.7982 42.4032 17.7331C42.6799 17.6648 42.9648 17.5655 43.2577 17.4353V18.3679C42.9875 18.4949 42.7125 18.5876 42.4325 18.6462C42.1526 18.7048 41.8173 18.7341 41.4267 18.7341C40.8961 18.7341 40.429 18.6316 40.0253 18.4265C39.6249 18.2182 39.3108 17.9089 39.0829 17.4988C38.8583 17.0886 38.746 16.5792 38.746 15.9705C38.746 15.365 38.8485 14.8506 39.0536 14.4275C39.2587 14.0043 39.5468 13.682 39.9179 13.4607C40.289 13.2393 40.7219 13.1286 41.2167 13.1286ZM41.2167 13.9929C40.8554 13.9929 40.5624 14.1101 40.3378 14.3445C40.1165 14.5788 39.9862 14.9223 39.9472 15.3747H42.4081C42.4049 15.1045 42.3593 14.8653 42.2714 14.657C42.1868 14.4486 42.0565 14.2859 41.8808 14.1687C41.7082 14.0515 41.4869 13.9929 41.2167 13.9929ZM47.5986 13.1286C48.24 13.1286 48.7541 13.363 49.1414 13.8318C49.5323 14.3005 49.7273 14.9971 49.7273 15.9216C49.7273 16.5336 49.6364 17.0495 49.4541 17.4695C49.275 17.8861 49.0227 18.2019 48.6973 18.4167C48.375 18.6283 47.9991 18.7341 47.5691 18.7341C47.2959 18.7341 47.0582 18.6983 46.8564 18.6267C46.6545 18.5551 46.4818 18.4623 46.3386 18.3484C46.1955 18.2312 46.075 18.1042 45.9773 17.9675H45.9091C45.9255 18.0977 45.94 18.2426 45.9532 18.4021C45.9691 18.5583 45.9773 18.7015 45.9773 18.8318V21.0339H44.8251V13.2312H45.7627L45.9236 13.9783H45.9773C46.0782 13.8253 46.2005 13.6836 46.3436 13.5535C46.49 13.4232 46.6659 13.3207 46.8709 13.2458C47.0795 13.1677 47.3218 13.1286 47.5986 13.1286ZM47.2909 14.0661C46.975 14.0661 46.7214 14.1296 46.5291 14.2566C46.3405 14.3803 46.2023 14.5675 46.1141 14.8181C46.0295 15.0687 45.9841 15.3829 45.9773 15.7605V15.9216C45.9773 16.322 46.0182 16.6622 46.0995 16.9421C46.1841 17.2188 46.3227 17.4304 46.5145 17.5769C46.71 17.7201 46.9736 17.7917 47.3055 17.7917C47.5855 17.7917 47.8168 17.7152 47.9991 17.5622C48.1845 17.4092 48.3227 17.1911 48.4141 16.908C48.505 16.6247 48.5509 16.2911 48.5509 15.907C48.5509 15.3243 48.4464 14.8718 48.2382 14.5495C48.0332 14.2273 47.7173 14.0661 47.2909 14.0661ZM52.2077 18.6365H51.0555V11.0388H52.2077V18.6365ZM58.6336 15.9216C58.6336 16.3708 58.575 16.7696 58.4577 17.1179C58.3409 17.4662 58.17 17.7608 57.945 18.0017C57.7205 18.2393 57.4505 18.4216 57.1345 18.5485C56.8191 18.6723 56.4623 18.7341 56.0655 18.7341C55.6941 18.7341 55.3541 18.6723 55.045 18.5485C54.7355 18.4216 54.4668 18.2393 54.2391 18.0017C54.0145 17.7608 53.8405 17.4662 53.7168 17.1179C53.5932 16.7696 53.5314 16.3708 53.5314 15.9216C53.5314 15.3259 53.6336 14.8214 53.8386 14.408C54.0473 13.9913 54.3432 13.6739 54.7273 13.4558C55.1114 13.2377 55.5691 13.1286 56.0995 13.1286C56.5977 13.1286 57.0368 13.2377 57.4177 13.4558C57.7986 13.6739 58.0964 13.9913 58.3114 14.408C58.5264 14.8246 58.6336 15.3292 58.6336 15.9216ZM54.7127 15.9216C54.7127 16.3155 54.76 16.6524 54.8545 16.9324C54.9523 17.2123 55.1018 17.4271 55.3036 17.5769C55.5055 17.7234 55.7659 17.7966 56.085 17.7966C56.4041 17.7966 56.6641 17.7234 56.8659 17.5769C57.0677 17.4271 57.2159 17.2123 57.3105 16.9324C57.405 16.6524 57.4523 16.3155 57.4523 15.9216C57.4523 15.5277 57.405 15.1941 57.3105 14.9206C57.2159 14.644 57.0677 14.434 56.8659 14.2908C56.6641 14.1443 56.4023 14.071 56.08 14.071C55.6045 14.071 55.2582 14.2305 55.04 14.5495C54.8218 14.8685 54.7127 15.3259 54.7127 15.9216ZM59.1368 13.2312H60.3868L61.495 16.3171C61.5436 16.4571 61.5877 16.5955 61.6268 16.7321C61.6691 16.8656 61.705 16.9975 61.7341 17.1277C61.7668 17.2579 61.7927 17.3881 61.8123 17.5183H61.8418C61.8741 17.349 61.92 17.1602 61.9786 16.9519C62.0405 16.7403 62.1086 16.5287 62.1836 16.3171L63.2482 13.2312H64.4832L62.1641 19.3786C62.0305 19.7302 61.8659 20.0297 61.6709 20.2771C61.4786 20.5277 61.2509 20.7165 60.9873 20.8435C60.7236 20.9737 60.4223 21.0388 60.0841 21.0388C59.9209 21.0388 59.7795 21.029 59.6591 21.0095C59.5386 20.9932 59.4359 20.9753 59.3514 20.9558V20.0378C59.42 20.0541 59.5059 20.0687 59.6105 20.0818C59.7145 20.0948 59.8218 20.1013 59.9327 20.1013C60.1377 20.1013 60.315 20.0606 60.4645 19.9792C60.6145 19.8979 60.7414 19.7823 60.8455 19.6325C60.95 19.486 61.0359 19.3184 61.1045 19.1296L61.295 18.6218L59.1368 13.2312ZM72.6864 15.9216C72.6864 16.3708 72.6277 16.7696 72.5105 17.1179C72.3936 17.4662 72.2227 17.7608 71.9982 18.0017C71.7732 18.2393 71.5032 18.4216 71.1873 18.5485C70.8718 18.6723 70.515 18.7341 70.1182 18.7341C69.7468 18.7341 69.4068 18.6723 69.0977 18.5485C68.7882 18.4216 68.5195 18.2393 68.2918 18.0017C68.0673 17.7608 67.8932 17.4662 67.7695 17.1179C67.6459 16.7696 67.5841 16.3708 67.5841 15.9216C67.5841 15.3259 67.6864 14.8214 67.8914 14.408C68.1 13.9913 68.3959 13.6739 68.78 13.4558C69.1641 13.2377 69.6218 13.1286 70.1523 13.1286C70.6505 13.1286 71.0895 13.2377 71.4705 13.4558C71.8514 13.6739 72.1495 13.9913 72.3641 14.408C72.5791 14.8246 72.6864 15.3292 72.6864 15.9216ZM68.7655 15.9216C68.7655 16.3155 68.8127 16.6524 68.9073 16.9324C69.005 17.2123 69.1545 17.4271 69.3564 17.5769C69.5582 17.7234 69.8186 17.7966 70.1377 17.7966C70.4568 17.7966 70.7168 17.7234 70.9186 17.5769C71.1205 17.4271 71.2686 17.2123 71.3632 16.9324C71.4577 16.6524 71.505 16.3155 71.505 15.9216C71.505 15.5277 71.4577 15.1941 71.3632 14.9206C71.2686 14.644 71.1205 14.434 70.9186 14.2908C70.7168 14.1443 70.455 14.071 70.1327 14.071C69.6573 14.071 69.3109 14.2305 69.0927 14.5495C68.8745 14.8685 68.7655 15.3259 68.7655 15.9216ZM76.8223 13.1286C77.4309 13.1286 77.9045 13.2865 78.2432 13.6023C78.585 13.9148 78.7559 14.4177 78.7559 15.111V18.6365H77.6082V15.3259C77.6082 14.906 77.5223 14.5919 77.3495 14.3835C77.1768 14.172 76.91 14.0661 76.5486 14.0661C76.0245 14.0661 75.66 14.2273 75.455 14.5495C75.2532 14.8718 75.1523 15.3389 75.1523 15.9509V18.6365H74.005V13.2312H74.8982L75.0595 13.9636H75.1232C75.24 13.7748 75.385 13.6202 75.5577 13.4997C75.7332 13.376 75.9286 13.2833 76.1436 13.2214C76.3614 13.1595 76.5877 13.1286 76.8223 13.1286ZM87.5841 18.6365H82.4523V17.8308L86.085 12.4939H82.5645V11.4978H87.4864V12.2985L83.8536 17.6404H87.5841V18.6365ZM90.875 13.1286C91.3568 13.1286 91.77 13.2279 92.115 13.4265C92.46 13.625 92.7255 13.9066 92.9109 14.2712C93.0964 14.6358 93.1895 15.072 93.1895 15.5798V16.195H89.5809C89.5941 16.7191 89.7341 17.1228 90.0009 17.406C90.2709 17.6892 90.6486 17.8308 91.1336 17.8308C91.4786 17.8308 91.7882 17.7982 92.0614 17.7331C92.3382 17.6648 92.6232 17.5655 92.9159 17.4353V18.3679C92.6459 18.4949 92.3705 18.5876 92.0909 18.6462C91.8109 18.7048 91.4755 18.7341 91.085 18.7341C90.5541 18.7341 90.0873 18.6316 89.6836 18.4265C89.2832 18.2182 88.9691 17.9089 88.7409 17.4988C88.5164 17.0886 88.4041 16.5792 88.4041 15.9705C88.4041 15.365 88.5068 14.8506 88.7118 14.4275C88.9168 14.0043 89.205 13.682 89.5759 13.4607C89.9473 13.2393 90.38 13.1286 90.875 13.1286ZM90.875 13.9929C90.5136 13.9929 90.2205 14.1101 89.9959 14.3445C89.7745 14.5788 89.6445 14.9223 89.6055 15.3747H92.0664C92.0632 15.1045 92.0173 14.8653 91.9295 14.657C91.845 14.4486 91.7145 14.2859 91.5391 14.1687C91.3664 14.0515 91.145 13.9929 90.875 13.9929ZM97.2227 13.1286C97.3136 13.1286 97.4132 13.1335 97.5205 13.1433C97.6277 13.153 97.7205 13.1661 97.7986 13.1824L97.6914 14.2566C97.6232 14.237 97.5382 14.2224 97.4373 14.2126C97.3395 14.2029 97.2518 14.198 97.1736 14.198C96.9686 14.198 96.7732 14.2321 96.5877 14.3005C96.4023 14.3656 96.2377 14.4665 96.0945 14.6033C95.9514 14.7367 95.8391 14.9044 95.7577 15.1062C95.6764 15.308 95.6355 15.5424 95.6355 15.8093V18.6365H94.4832V13.2312H95.3818L95.5382 14.1833H95.5918C95.6991 13.9913 95.8327 13.8155 95.9923 13.656C96.1518 13.4965 96.3341 13.3695 96.5391 13.2751C96.7473 13.1775 96.975 13.1286 97.2227 13.1286ZM103.585 15.9216C103.585 16.3708 103.526 16.7696 103.409 17.1179C103.292 17.4662 103.121 17.7608 102.896 18.0017C102.672 18.2393 102.402 18.4216 102.086 18.5485C101.77 18.6723 101.414 18.7341 101.016 18.7341C100.645 18.7341 100.305 18.6723 99.9959 18.5485C99.6868 18.4216 99.4182 18.2393 99.1905 18.0017C98.9659 17.7608 98.7914 17.4662 98.6677 17.1179C98.5441 16.7696 98.4823 16.3708 98.4823 15.9216C98.4823 15.3259 98.585 14.8214 98.79 14.408C98.9982 13.9913 99.2945 13.6739 99.6786 13.4558C100.063 13.2377 100.52 13.1286 101.051 13.1286C101.549 13.1286 101.988 13.2377 102.369 13.4558C102.75 13.6739 103.048 13.9913 103.263 14.408C103.477 14.8246 103.585 15.3292 103.585 15.9216ZM99.6641 15.9216C99.6641 16.3155 99.7114 16.6524 99.8055 16.9324C99.9032 17.2123 100.053 17.4271 100.255 17.5769C100.457 17.7234 100.717 17.7966 101.036 17.7966C101.355 17.7966 101.615 17.7234 101.817 17.5769C102.019 17.4271 102.167 17.2123 102.262 16.9324C102.356 16.6524 102.403 16.3155 102.403 15.9216C102.403 15.5277 102.356 15.1941 102.262 14.9206C102.167 14.644 102.019 14.434 101.817 14.2908C101.615 14.1443 101.354 14.071 101.031 14.071C100.556 14.071 100.209 14.2305 99.9909 14.5495C99.7732 14.8685 99.6641 15.3259 99.6641 15.9216ZM107.677 13.1286C108.318 13.1286 108.832 13.363 109.22 13.8318C109.61 14.3005 109.805 14.9971 109.805 15.9216C109.805 16.5336 109.715 17.0495 109.532 17.4695C109.353 17.8861 109.101 18.2019 108.775 18.4167C108.453 18.6283 108.077 18.7341 107.647 18.7341C107.374 18.7341 107.136 18.6983 106.935 18.6267C106.733 18.5551 106.56 18.4623 106.417 18.3484C106.274 18.2312 106.153 18.1042 106.055 17.9675H105.987C106.004 18.0977 106.018 18.2426 106.031 18.4021C106.047 18.5583 106.055 18.7015 106.055 18.8318V21.0339H104.903V13.2312H105.841L106.002 13.9783H106.055C106.156 13.8253 106.279 13.6836 106.422 13.5535C106.568 13.4232 106.744 13.3207 106.949 13.2458C107.157 13.1677 107.4 13.1286 107.677 13.1286ZM107.369 14.0661C107.053 14.0661 106.8 14.1296 106.607 14.2566C106.419 14.3803 106.28 14.5675 106.192 14.8181C106.108 15.0687 106.062 15.3829 106.055 15.7605V15.9216C106.055 16.322 106.096 16.6622 106.178 16.9421C106.262 17.2188 106.4 17.4304 106.593 17.5769C106.788 17.7201 107.052 17.7917 107.384 17.7917C107.664 17.7917 107.895 17.7152 108.077 17.5622C108.263 17.4092 108.401 17.1911 108.492 16.908C108.583 16.6247 108.629 16.2911 108.629 15.907C108.629 15.3243 108.525 14.8718 108.316 14.5495C108.111 14.2273 107.795 14.0661 107.369 14.0661ZM114.766 17.0935C114.766 17.4483 114.68 17.7478 114.508 17.9919C114.335 18.236 114.083 18.4216 113.751 18.5485C113.422 18.6723 113.019 18.7341 112.54 18.7341C112.162 18.7341 111.837 18.7065 111.563 18.6511C111.293 18.599 111.038 18.5176 110.797 18.407V17.4158C111.054 17.5362 111.342 17.6404 111.661 17.7283C111.983 17.8161 112.288 17.8601 112.574 17.8601C112.952 17.8601 113.224 17.8015 113.39 17.6843C113.555 17.5639 113.639 17.4044 113.639 17.2058C113.639 17.0886 113.605 16.9845 113.536 16.8933C113.471 16.7989 113.347 16.7029 113.165 16.6052C112.986 16.5043 112.722 16.3839 112.374 16.2439C112.032 16.1071 111.744 15.9705 111.51 15.8337C111.275 15.697 111.098 15.5326 110.977 15.3405C110.857 15.1452 110.797 14.8962 110.797 14.5935C110.797 14.115 110.985 13.752 111.363 13.5046C111.744 13.254 112.247 13.1286 112.872 13.1286C113.204 13.1286 113.516 13.1628 113.81 13.2312C114.106 13.2963 114.395 13.3923 114.679 13.5193L114.317 14.3835C114.073 14.2761 113.827 14.1882 113.58 14.1199C113.336 14.0482 113.087 14.0124 112.833 14.0124C112.537 14.0124 112.31 14.058 112.154 14.1491C112.001 14.2403 111.925 14.3705 111.925 14.5398C111.925 14.6667 111.962 14.7741 112.037 14.862C112.112 14.9499 112.24 15.0378 112.423 15.1257C112.608 15.2136 112.865 15.3226 113.194 15.4529C113.516 15.5765 113.795 15.7068 114.029 15.8435C114.267 15.977 114.449 16.1413 114.576 16.3366C114.703 16.532 114.766 16.7842 114.766 17.0935Z" fill="#292929" />
                        <mask id="mask0_469_290"
                            style={{ maskType: 'luminance' } as React.CSSProperties}
                            maskUnits="userSpaceOnUse"
                            x="124"
                            y="10"
                            width="12"
                            height="11">
                            <path d="M135.455 10H124.545V20.9091H135.455V10Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_469_290)">
                            <path d="M127.273 16.8181C126.895 16.8181 126.555 16.9727 126.309 17.2182C125.773 17.7545 125.455 20 125.455 20C125.455 20 127.7 19.6818 128.236 19.1454C128.482 18.9 128.636 18.5591 128.636 18.1818C128.636 17.4272 128.027 16.8181 127.273 16.8181ZM127.595 18.5045C127.468 18.6318 126.609 18.85 126.609 18.85C126.609 18.85 126.823 17.9954 126.955 17.8636C127.032 17.7772 127.145 17.7272 127.273 17.7272C127.523 17.7272 127.727 17.9318 127.727 18.1818C127.727 18.3091 127.677 18.4227 127.595 18.5045ZM132.464 16.2045C135.355 13.3136 134.391 11.0636 134.391 11.0636C134.391 11.0636 132.141 10.1 129.25 12.9909L128.118 12.7636C127.823 12.7045 127.514 12.8 127.295 13.0136L125.455 14.8591L127.727 15.8318L129.623 17.7272L130.595 20L132.436 18.1591C132.65 17.9454 132.745 17.6363 132.686 17.3363L132.464 16.2045ZM127.914 14.9227L127.045 14.55L127.941 13.6545L128.595 13.7863C128.336 14.1636 128.105 14.5591 127.914 14.9227ZM130.905 18.4091L130.532 17.5409C130.895 17.35 131.291 17.1182 131.664 16.8591L131.795 17.5136L130.905 18.4091ZM131.818 15.5636C131.218 16.1636 130.282 16.6545 129.982 16.8045L128.65 15.4727C128.795 15.1772 129.286 14.2409 129.891 13.6363C132.018 11.5091 133.632 11.8227 133.632 11.8227C133.632 11.8227 133.945 13.4363 131.818 15.5636ZM131.364 15C131.864 15 132.273 14.5909 132.273 14.0909C132.273 13.5909 131.864 13.1818 131.364 13.1818C130.864 13.1818 130.455 13.5909 130.455 14.0909C130.455 14.5909 130.864 15 131.364 15Z" fill="#292929" />
                        </g>
                    </g>
                    <defs>
                        <clipPath id="clip0_469_290">
                            <rect width="166.364" height="30" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </a>
    );
};

export default DeployButton;
