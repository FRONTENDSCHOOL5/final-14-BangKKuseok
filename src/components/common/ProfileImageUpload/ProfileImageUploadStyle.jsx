import styled from 'styled-components';

const ProfileImageUploadWrapper = styled.div`
  width: 110px;
  position: relative;
  & > img {
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    aspect-ratio: 1;
    box-sizing: border-box;
    object-fit: cover;
  }
`;

const UploadBox = styled.div`
  position: absolute;
  inset: auto 0 0 auto;
  width: 36px;
  label {
    cursor: pointer;
  }
  input:focus-visible + label {
    outline: 2px solid skyblue;
  }
`;

export { ProfileImageUploadWrapper, UploadBox };
