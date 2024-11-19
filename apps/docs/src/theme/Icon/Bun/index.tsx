import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconBun = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 292 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}
    >
      <path d="M259.256 75.5631C258.674 74.9438 258.054 74.3245 257.435 73.7417C256.816 73.1588 256.233 72.5031 255.614 71.9203C254.994 71.3374 254.411 70.6817 253.792 70.0988C253.173 69.516 252.59 68.8603 251.971 68.2774C251.351 67.6945 250.769 67.0388 250.149 66.456C249.53 65.8731 248.947 65.2174 248.328 64.6345C247.709 64.0517 247.126 63.396 246.506 62.8131C264.576 80.571 274.927 104.729 275.321 130.06C275.321 190.422 214.049 239.528 138.714 239.528C96.53 239.528 58.7901 224.119 33.6908 199.967L35.5122 201.788L37.3336 203.61L39.1551 205.431L40.9765 207.252L42.7979 209.074L44.6193 210.895L46.4408 212.717C71.5036 237.889 110.081 254.1 153.286 254.1C228.62 254.1 289.893 204.994 289.893 144.814C289.893 119.095 278.819 94.7245 259.256 75.5631Z" fill="black" />
      <path d="M266.214 130.06C266.214 185.468 209.131 230.385 138.714 230.385C68.2979 230.385 11.2143 185.468 11.2143 130.06C11.2143 95.7082 33.0715 65.3632 66.6586 47.3674C100.246 29.3717 121.156 10.9389 138.714 10.9389C156.273 10.9389 171.281 25.9839 210.77 47.3674C244.357 65.3632 266.214 95.7082 266.214 130.06Z" fill="#FBF0DF" />
      <path d="M266.214 130.06C266.197 122.942 265.216 115.86 263.3 109.005C253.355 230.312 105.382 236.14 47.2058 199.857C73.3579 220.128 105.63 230.894 138.714 230.385C209.021 230.385 266.214 185.395 266.214 130.06Z" fill="#F6DECE" />
      <path d="M89.6451 40.701C105.929 30.9382 127.567 12.6146 148.841 12.5782C145.569 11.5203 142.154 10.9675 138.714 10.9389C129.899 10.9389 120.5 15.4924 108.661 22.341C104.544 24.7453 100.282 27.4046 95.7651 30.1732C87.2772 35.4189 77.5508 41.3567 66.6222 47.2946C31.9422 66.0553 11.2143 96.9832 11.2143 130.06C11.2143 131.517 11.2143 132.975 11.2143 134.395C33.2901 56.4017 73.3979 50.4639 89.6451 40.701Z" fill="#FFFEFC" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M128.223 20.1553C128.274 28.7569 126.468 37.2682 122.928 45.1079C119.389 52.9477 114.199 59.9313 107.714 65.5817C106.694 66.4925 107.495 68.241 108.806 67.731C121.083 62.9589 137.658 48.6789 130.664 19.8639C130.372 18.2246 128.223 18.6617 128.223 20.1553ZM136.492 20.1553C140.949 27.428 143.781 35.5786 144.794 44.0482C145.806 52.5179 144.975 61.1063 142.357 69.2246C141.92 70.4996 143.486 71.5925 144.361 70.536C152.339 60.336 159.296 40.0817 138.459 18.2246C137.403 17.2774 135.764 18.7346 136.492 20.0096V20.1553ZM146.546 19.536C153.527 24.4777 159.366 30.8589 163.671 38.249C167.975 45.6391 170.645 53.8664 171.5 62.376C171.463 62.6827 171.546 62.9917 171.731 63.2392C171.915 63.4866 172.188 63.6533 172.493 63.7049C172.798 63.7564 173.11 63.6888 173.366 63.516C173.622 63.3432 173.802 63.0784 173.868 62.7767C177.219 50.0632 175.325 28.3882 147.749 17.1317C146.291 16.5489 145.344 18.516 146.546 19.3903V19.536ZM79.2993 57.4217C87.6024 54.9412 95.2899 50.7397 101.861 45.0909C108.433 39.442 113.741 32.4725 117.44 24.636C118.096 23.3246 120.172 23.8346 119.844 25.2917C113.542 54.4346 92.45 60.5182 79.3357 59.7167C77.9515 59.7532 77.9879 57.8225 79.2993 57.4217Z" fill="#CCBEA7" />
      <path d="M138.714 239.528C63.38 239.528 2.10719 190.422 2.10719 130.06C2.10719 93.6317 24.62 59.6439 62.3236 39.2803C73.2522 33.4517 82.6143 27.5867 90.9565 22.4503C95.5465 19.6089 99.8815 16.9496 104.071 14.4724C116.857 6.8953 127.786 1.83173 138.714 1.83173C149.643 1.83173 159.187 6.20315 171.136 13.2703C174.779 15.3467 178.421 17.6053 182.319 20.0824C191.39 25.6924 201.626 32.031 215.105 39.2803C252.809 59.6439 275.321 93.5953 275.321 130.06C275.321 190.422 214.049 239.528 138.714 239.528ZM138.714 10.9389C129.899 10.9389 120.5 15.4924 108.661 22.341C104.544 24.7453 100.282 27.4046 95.765 30.1732C87.2772 35.4189 77.5508 41.3567 66.6222 47.2946C31.9422 66.0553 11.2143 96.9832 11.2143 130.06C11.2143 185.395 68.4072 230.421 138.714 230.421C209.021 230.421 266.214 185.395 266.214 130.06C266.214 96.9832 245.486 66.0553 210.77 47.3674C197 40.0817 186.254 33.2332 177.547 27.8417C173.576 25.401 169.934 23.1424 166.619 21.1389C155.581 14.5817 147.53 10.9389 138.714 10.9389Z" fill="black" />
      <path d="M164.396 156.653C162.76 163.356 159.035 169.364 153.759 173.811C149.799 177.65 144.671 180.06 139.188 180.66C133.54 180.155 128.232 177.739 124.143 173.811C118.921 169.343 115.249 163.337 113.651 156.653C113.599 156.256 113.637 155.853 113.764 155.473C113.892 155.094 114.104 154.748 114.385 154.463C114.666 154.178 115.009 153.962 115.387 153.83C115.765 153.698 116.168 153.654 116.566 153.702H161.519C161.913 153.66 162.312 153.709 162.685 153.843C163.059 153.978 163.397 154.195 163.674 154.479C163.951 154.763 164.16 155.107 164.285 155.483C164.41 155.86 164.448 156.26 164.396 156.653Z" fill="#B71422" />
      <path d="M124.143 174.102C128.224 178.033 133.512 180.472 139.151 181.024C144.778 180.464 150.052 178.026 154.124 174.102C155.426 172.888 156.643 171.586 157.766 170.205C155.522 167.659 152.781 165.599 149.711 164.152C146.642 162.705 143.308 161.901 139.916 161.79C136.287 161.876 132.733 162.842 129.56 164.606C126.387 166.37 123.691 168.879 121.702 171.917C122.54 172.682 123.269 173.41 124.143 174.102Z" fill="#FF6164" />
      <path d="M124.726 171.225C126.532 168.89 128.844 166.995 131.487 165.683C134.131 164.371 137.038 163.675 139.989 163.647C145.445 163.808 150.643 166.004 154.561 169.804C155.399 168.893 156.2 167.946 156.965 166.999C152.331 162.585 146.206 160.076 139.807 159.968C136.388 159.998 133.017 160.784 129.937 162.27C126.857 163.757 124.144 165.906 121.994 168.565C122.855 169.501 123.767 170.389 124.726 171.225Z" fill="black" />
      <path d="M139.042 182.845C132.972 182.313 127.259 179.746 122.831 175.56C117.193 170.79 113.223 164.345 111.502 157.163C111.379 156.524 111.4 155.865 111.564 155.235C111.727 154.604 112.03 154.019 112.449 153.52C112.949 152.917 113.579 152.437 114.292 152.115C115.006 151.793 115.783 151.638 116.566 151.662H161.519C162.3 151.646 163.075 151.804 163.787 152.126C164.499 152.447 165.131 152.924 165.635 153.52C166.05 154.02 166.348 154.607 166.505 155.238C166.663 155.869 166.677 156.526 166.546 157.163C164.825 164.345 160.855 170.79 155.216 175.56C150.798 179.739 145.1 182.305 139.042 182.845ZM116.566 155.888C115.983 155.888 115.837 156.143 115.801 156.216C117.341 162.444 120.824 168.02 125.746 172.135C129.345 175.681 134.024 177.924 139.042 178.51C144.047 177.931 148.721 175.716 152.339 172.208C157.245 168.086 160.715 162.511 162.247 156.289C162.168 156.172 162.058 156.08 161.929 156.022C161.801 155.964 161.658 155.943 161.519 155.961L116.566 155.888Z" fill="black" />
      <path d="M194.159 158.912C205.928 158.912 215.469 153.301 215.469 146.38C215.469 139.459 205.928 133.849 194.159 133.849C182.389 133.849 172.848 139.459 172.848 146.38C172.848 153.301 182.389 158.912 194.159 158.912Z" fill="#FEBBD0" />
      <path d="M83.8893 158.912C95.6589 158.912 105.2 153.301 105.2 146.38C105.2 139.459 95.6589 133.849 83.8893 133.849C72.1198 133.849 62.5786 139.459 62.5786 146.38C62.5786 153.301 72.1198 158.912 83.8893 158.912Z" fill="#FEBBD0" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M93.9072 141.353C97.8786 141.36 101.763 140.189 105.069 137.988C108.374 135.787 110.953 132.655 112.477 128.988C114.002 125.32 114.405 121.283 113.634 117.387C112.864 113.491 110.955 109.912 108.15 107.101C105.344 104.29 101.768 102.375 97.8729 101.597C93.9783 100.82 89.9406 101.215 86.2708 102.733C82.6009 104.251 79.464 106.824 77.2568 110.126C75.0496 113.427 73.8715 117.31 73.8715 121.281C73.8715 126.598 75.9812 131.698 79.7376 135.461C83.494 139.224 88.59 141.343 93.9072 141.353ZM184.141 141.353C188.117 141.382 192.012 140.229 195.332 138.041C198.652 135.853 201.247 132.729 202.789 129.064C204.33 125.399 204.748 121.358 203.991 117.455C203.233 113.552 201.332 109.962 198.531 107.14C195.73 104.318 192.154 102.392 188.256 101.606C184.359 100.819 180.315 101.208 176.639 102.723C172.963 104.238 169.82 106.811 167.607 110.114C165.395 113.418 164.214 117.305 164.214 121.281C164.205 126.582 166.296 131.671 170.031 135.433C173.766 139.196 178.84 141.324 184.141 141.353Z" fill="black" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M87.7143 122.556C89.2073 122.563 90.6688 122.127 91.9136 121.303C93.1585 120.479 94.1306 119.304 94.707 117.926C95.2833 116.549 95.4378 115.032 95.151 113.567C94.8642 112.101 94.1489 110.754 93.0957 109.696C92.0426 108.638 90.6991 107.916 89.2353 107.622C87.7716 107.328 86.2535 107.475 84.8735 108.045C83.4935 108.615 82.3137 109.581 81.4835 110.822C80.6533 112.063 80.2101 113.522 80.2101 115.015C80.21 117.009 80.9995 118.921 82.4058 120.335C83.8121 121.748 85.7207 122.546 87.7143 122.556ZM177.948 122.556C179.441 122.563 180.902 122.127 182.147 121.303C183.392 120.479 184.364 119.304 184.941 117.926C185.517 116.549 185.671 115.032 185.385 113.567C185.098 112.101 184.382 110.754 183.329 109.696C182.276 108.638 180.933 107.916 179.469 107.622C178.005 107.328 176.487 107.475 175.107 108.045C173.727 108.615 172.547 109.581 171.717 110.822C170.887 112.063 170.444 113.522 170.444 115.015C170.443 116.996 171.223 118.898 172.613 120.309C174.004 121.72 175.894 122.527 177.875 122.556H177.948Z" fill="white" />
    </svg>
  );
};

export default IconBun;
