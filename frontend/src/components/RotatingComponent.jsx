
function RotatingComponent() {
    return (
    <>
      <style>
        {`
          .rotating-circle {
            width: 30px;
            height: 30px;
            position: absolute;
            z-index: 2;
            border: 6px dotted white;
            border-top: 6px solid transparent;
            border-radius: 50%;
            animation: spin 1s steps(20, end) infinite;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <div className="rotating-circle"></div>
    </>
  );
}

export default RotatingComponent;
