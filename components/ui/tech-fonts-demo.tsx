"use client";

import React from 'react';

const TechFontsDemo = () => {
  return (
    <div className="p-8 space-y-8 bg-background">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="font-tech-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wide text-gradient">
          Tech Fonts Demo
        </h1>
        <p className="font-tech-body text-lg text-muted-foreground max-w-2xl mx-auto">
          Showcase of the comprehensive tech-themed font system implemented in your portfolio
        </p>
      </div>

      {/* Font Hierarchy Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Headings */}
        <div className="space-y-4">
          <h2 className="font-tech-heading text-2xl border-b border-border pb-2">
            Heading Hierarchy
          </h2>
          <div className="space-y-2">
            <h1 className="font-rajdhani text-xl">H1 - Rajdhani (Main Titles)</h1>
            <h2 className="font-exo-2 text-lg">H2 - Exo 2 (Section Headers)</h2>
            <h3 className="font-orbitron text-base">H3 - Orbitron (Subheadings)</h3>
            <h4 className="font-orbitron text-sm">H4 - Orbitron (Minor Headers)</h4>
          </div>
        </div>

        {/* Code Fonts */}
        <div className="space-y-4">
          <h2 className="font-tech-heading text-2xl border-b border-border pb-2">
            Code & Technical
          </h2>
          <div className="space-y-3">
            <div>
              <p className="font-tech-body text-sm mb-1">JetBrains Mono (Primary):</p>
              <code className="font-jetbrains-mono text-sm bg-primary/10 px-2 py-1 rounded">
                const message = "Hello Tech!";
              </code>
            </div>
            <div>
              <p className="font-tech-body text-sm mb-1">Fira Code (Secondary):</p>
              <code className="font-fira-code text-sm bg-secondary/10 px-2 py-1 rounded">
                function deploy() {"{"} return "🚀"; {"}"}
              </code>
            </div>
            <div>
              <p className="font-tech-body text-sm mb-1">IBM Plex Mono (Body):</p>
              <code className="font-ibm-plex-mono text-sm bg-accent/10 px-2 py-1 rounded">
                body &#123; font-family: "IBM Plex Mono"; &#125;
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Live Code Example */}
      <div className="space-y-4">
        <h2 className="font-tech-heading text-2xl">Live Code Example</h2>
        <div className="bg-black text-green-400 p-6 rounded-lg font-jetbrains-mono text-sm overflow-x-auto">
          <div className="space-y-1">
            <div><span className="text-purple-400">const</span> <span className="text-blue-400">portfolio</span> = {"{"}</div>
            <div className="ml-4"><span className="text-yellow-400">developer</span>: <span className="text-green-400">"Full Stack"</span>,</div>
            <div className="ml-4"><span className="text-yellow-400">experience</span>: <span className="text-green-400">"5+ years"</span>,</div>
            <div className="ml-4"><span className="text-yellow-400">specialties</span>: [<span className="text-green-400">"React"</span>, <span className="text-green-400">"TypeScript"</span>, <span className="text-green-400">"Node.js"</span>],</div>
            <div className="ml-4"><span className="text-yellow-400">status</span>: <span className="text-green-400">"Available for hire"</span></div>
            <div>{"}"};</div>
          </div>
        </div>
      </div>

      {/* Body Text Examples */}
      <div className="space-y-4">
        <h2 className="font-tech-heading text-2xl">Body Text with IBM Plex Mono</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-card border border-border p-4 rounded-lg space-y-2">
            <h3 className="font-orbitron text-sm font-bold">About Section</h3>
            <p className="font-tech-body text-sm">
              Passionate full-stack developer with expertise in modern web technologies. 
              Building scalable applications with clean, efficient code.
            </p>
          </div>
          <div className="bg-card border border-border p-4 rounded-lg space-y-2">
            <h3 className="font-orbitron text-sm font-bold">Project Description</h3>
            <p className="font-tech-body text-sm">
              E-commerce platform built with Next.js, featuring real-time inventory 
              management and seamless payment integration.
            </p>
          </div>
        </div>
      </div>

      {/* UI Elements */}
      <div className="space-y-4">
        <h2 className="font-tech-heading text-2xl">UI Elements with Tech Fonts</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Tech Badge */}
          <div className="bg-card border border-border p-4 rounded-lg space-y-2">
            <h3 className="font-orbitron text-sm font-bold">TECH STACK</h3>
            <div className="flex flex-wrap gap-1">
              <code className="font-tech-primary text-xs bg-primary/20 px-2 py-1 rounded">React</code>
              <code className="font-tech-primary text-xs bg-secondary/20 px-2 py-1 rounded">TypeScript</code>
              <code className="font-tech-primary text-xs bg-accent/20 px-2 py-1 rounded">Next.js</code>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-card border border-border p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-tech-body text-sm font-medium">System Status</span>
            </div>
            <code className="font-space-mono text-xs text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</code>
          </div>

          {/* Navigation */}
          <div className="bg-card border border-border p-4 rounded-lg space-y-2">
            <h3 className="font-exo-2 text-sm font-semibold">Navigation</h3>
            <nav className="space-y-1">
              <div className="font-tech-body text-xs text-muted-foreground hover:text-foreground cursor-pointer">Home</div>
              <div className="font-tech-body text-xs text-muted-foreground hover:text-foreground cursor-pointer">Projects</div>
              <div className="font-tech-body text-xs text-muted-foreground hover:text-foreground cursor-pointer">Skills</div>
            </nav>
          </div>
        </div>
      </div>

      {/* Font Comparison */}
      <div className="space-y-4">
        <h2 className="font-tech-heading text-2xl">Font Comparison</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-card border border-border p-4 rounded-lg">
            <h3 className="font-orbitron text-sm font-bold mb-2">IBM Plex Mono (Body)</h3>
            <p className="font-tech-body text-sm">
              Professional monospace font perfect for body text, descriptions, and technical content.
            </p>
          </div>
          <div className="bg-card border border-border p-4 rounded-lg">
            <h3 className="font-orbitron text-sm font-bold mb-2">Futuristic Display</h3>
            <p className="font-rajdhani text-sm">
              Rajdhani - Bold, futuristic, ideal for main headings and call-to-actions.
            </p>
          </div>
        </div>
      </div>

      {/* Implementation Tips */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 rounded-lg">
        <h2 className="font-tech-heading text-2xl mb-4">Implementation Tips</h2>
        <div className="space-y-2 font-tech-body text-sm">
          <p>• Use <code className="font-jetbrains-mono bg-primary/20 px-1 rounded">font-tech-primary</code> for main code content</p>
          <p>• Use <code className="font-exo-2 bg-secondary/20 px-1 rounded">font-tech-heading</code> for section headers</p>
          <p>• Use <code className="font-rajdhani bg-accent/20 px-1 rounded">font-tech-display</code> for main titles</p>
          <p>• Use <code className="font-ibm-plex-mono bg-muted/50 px-1 rounded">font-tech-body</code> for all body text</p>
          <p>• Combine with color utilities for enhanced tech aesthetics</p>
        </div>
      </div>
    </div>
  );
};

export default TechFontsDemo;