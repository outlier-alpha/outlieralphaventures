const NeuralMesh = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
      {/* Neural network lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Flowing neural connections */}
        {Array.from({ length: 3 }).map((_, i) => (
          <g key={i}>
            <path
              d={`M-100,${200 + i * 200} Q${300 + i * 100},${150 + i * 150} ${800 + i * 200},${250 + i * 100} T${1400 + i * 100},${200 + i * 120}`}
              stroke="url(#neuralGradient)"
              strokeWidth="1"
              fill="none"
              className="animate-neural-flow"
              style={{
                animationDelay: `${i * 7}s`,
                animationDuration: `${20 + i * 5}s`
              }}
            />
            
            {/* Neural nodes */}
            {Array.from({ length: 4 }).map((_, j) => (
              <circle
                key={`${i}-${j}`}
                cx={200 + j * 300 + i * 50}
                cy={200 + i * 150 + Math.sin(j) * 50}
                r="2"
                fill="hsl(var(--primary-glow))"
                className="animate-neural-pulse"
                style={{
                  animationDelay: `${(i * 4 + j) * 0.8}s`
                }}
              />
            ))}
          </g>
        ))}
        
        {/* Secondary mesh layer */}
        {Array.from({ length: 2 }).map((_, i) => (
          <g key={`secondary-${i}`} opacity="0.4">
            <path
              d={`M-50,${100 + i * 300} Q${400 + i * 150},${300 + i * 100} ${900 + i * 100},${150 + i * 200} T${1500 + i * 50},${250 + i * 80}`}
              stroke="hsl(var(--secondary))"
              strokeWidth="0.5"
              fill="none"
              className="animate-neural-flow"
              style={{
                animationDelay: `${10 + i * 6}s`,
                animationDuration: `${25 + i * 3}s`
              }}
            />
          </g>
        ))}
      </svg>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-neural-flow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NeuralMesh;