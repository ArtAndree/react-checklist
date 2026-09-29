import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const globalStyles = css`
  * { box-sizing: border-box; }
  body { margin: 0; background: #f5f5f0; color: #25392f; font-family: 'Segoe UI', system-ui, sans-serif; }
  button, input { font: inherit; }
  button { cursor: pointer; }
  button:disabled { cursor: not-allowed; opacity: .45; }
  button, input { -webkit-tap-highlight-color: transparent; }
  :focus-visible { outline: 3px solid #b87b39; outline-offset: 4px; }
  ::selection { background: #dbebbc; }
`;
export const Button = styled.button`
  border: 0; border-radius: 12px; padding: 13px 20px;
  background: #294f3c; color: white; font-weight: 600;
  &:hover:not(:disabled) { background: #193d2b; }
`;
export const QuietButton = styled.button`
  border: 1px solid #dce2d9; border-radius: 9px; padding: 8px 11px;
  background: white; color: #435b4e; font-size: 13px;
  &:hover { background: #f0f4eb; }
`;
export const Input = styled.input`
  min-width: 0; width: 100%; border: 1px solid #d9e0d4; border-radius: 12px;
  padding: 14px 16px; background: #fafbf8; color: #25392f;
  &::placeholder { color: #778277; }
`;
