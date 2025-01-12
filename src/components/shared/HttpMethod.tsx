import clsx from "clsx";
import React, { MouseEvent, useEffect, useState } from "react";

import styles from "./HttpMethod.module.css";

const copyToClipboard = async (text: string) => {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
};

export enum HttpMethods {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  GET = "GET",
  PATCH = "PATCH",
}

interface HttpMethod {
  method: HttpMethods;
  endpoint: string;
}

export const HttpMethod = ({ method, endpoint }: HttpMethod) => {
  const [isCopied, setCopied] = useState<boolean>(false);

  const containerClass = clsx({
    [styles.post]: method == HttpMethods.POST,
    [styles.put]: method == HttpMethods.PUT,
    [styles.delete]: method == HttpMethods.DELETE,
    [styles.get]: method == HttpMethods.GET,
    [styles.patch]: method == HttpMethods.PATCH,
  });

  useEffect(() => {
    if (isCopied)
      setTimeout(() => {
        setCopied(false);
      }, 1000);
  }, [isCopied]);

  const onClick = (_: MouseEvent<HTMLDivElement>) => {
    setCopied(true);
    copyToClipboard(endpoint);
  };

  return (
    <div className={clsx([styles.container, containerClass])}>
      <span className={styles.method}>{method}</span> {endpoint}
      <div className={styles.copy} onClick={onClick}>
        {isCopied ? (
          <svg width="24" height="18" viewBox="0 0 18 18" fill="#00d600">
            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Copy</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.16488 3.31632C3.9398 3.31632 3.72395 3.40573 3.56479 3.56489C3.40564 3.72404 3.31623 3.9399 3.31623 4.16497V11.0726C3.31623 11.2976 3.40564 11.5135 3.56479 11.6726C3.72395 11.8318 3.9398 11.9212 4.16488 11.9212H5.01353V6.92801C5.01353 5.87072 5.87063 5.01362 6.92792 5.01362H11.9211V4.16497C11.9211 3.9399 11.8317 3.72404 11.6726 3.56489C11.5134 3.40573 11.2975 3.31632 11.0725 3.31632H4.16488ZM12.9869 5.01362V4.16497C12.9869 3.65724 12.7852 3.17031 12.4262 2.81129C12.0671 2.45227 11.5802 2.25058 11.0725 2.25058H4.16488C3.65715 2.25058 3.17022 2.45227 2.8112 2.81129C2.45218 3.17031 2.25049 3.65724 2.25049 4.16497V11.0726C2.25049 11.5803 2.45218 12.0672 2.8112 12.4262C3.17022 12.7853 3.65715 12.987 4.16488 12.987H5.01353V13.8356C5.01353 14.8929 5.87063 15.75 6.92792 15.75H13.8355C14.8928 15.75 15.7499 14.8929 15.7499 13.8356V6.92801C15.7499 5.87072 14.8928 5.01362 13.8355 5.01362H12.9869ZM12.4533 6.07936C12.4535 6.07936 12.4538 6.07936 12.454 6.07936C12.4542 6.07936 12.4544 6.07936 12.4547 6.07936H13.8355C14.3042 6.07936 14.6842 6.45931 14.6842 6.92801V13.8356C14.6842 14.3043 14.3042 14.6842 13.8355 14.6842H6.92792C6.45922 14.6842 6.07927 14.3043 6.07927 13.8356V12.4548C6.07927 12.4545 6.07927 12.4543 6.07927 12.4541C6.07927 12.4539 6.07927 12.4536 6.07927 12.4534V6.92801C6.07927 6.45931 6.45922 6.07936 6.92792 6.07936H12.4533Z"
              fill="currentColor"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
};
