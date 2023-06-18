import styled from 'styled-components';

const PostImgUploadWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 342px;
  width: calc(100% - 48px);
  aspect-ratio: 1;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background-color: ${({ theme }) => theme.colors.gray50};
  overflow: hidden;
  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
  p {
    width: 100%;
    height: 100%;
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.gray200};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const UploadForm = styled.form`
  position: absolute;
  inset: auto 16px 16px auto;
  width: 40px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(10px);
  border-radius: 50%;

  label {
    cursor: pointer;
  }
  input:focus-visible + label {
    outline: 2px solid skyblue;
  }
`;

export { PostImgUploadWrapper, UploadForm };
