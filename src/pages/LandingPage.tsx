
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Database, FileText, ChevronRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import Footer from "@/components/layout/Footer";
import EmailVerificationTest from "@/components/EmailVerificationTest";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full py-6 px-6 flex justify-center">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Logo size="lg" />
            
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/5 py-20 md:py-32">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
                  Verify Emails with <span className="text-primary">99% Accuracy</span>
                </h1>
                <p className="text-xl text-muted-foreground animate-slide-up" style={{animationDelay: '100ms'}}>
                  Reduce bounce rates, protect your sender reputation, and improve deliverability with our powerful email verification platform.
                </p>

                {/* Add email verification test component */}
                <div className="pt-4 animate-slide-up" style={{animationDelay: '200ms'}}>
                  <EmailVerificationTest />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{animationDelay: '300ms'}}>
                  <Button asChild size="lg">
                    <Link to="/signup">Start Free Trial</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="#features">
                      Learn More <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6 animate-slide-up" style={{animationDelay: '400ms'}}>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 mr-1 text-primary" /> GDPR Compliant
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 mr-1 text-primary" /> Data Secure
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 mr-1 text-primary" /> 10M+ Emails Verified
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center animate-slide-up" style={{animationDelay: '500ms'}}>
                <div className="w-full max-w-md relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl blur-xl opacity-50 animate-pulse-slow"></div>
                  <div className="bg-card rounded-xl p-6 border relative">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Email Verification</h3>
                        <div className="flex items-center">
                          <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                          <span className="text-sm text-muted-foreground">Live</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between p-2 bg-muted/50 rounded items-center">
                          <span className="text-sm">john.doe@gmail.com</span>
                          <span className="text-sm text-green-500 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" /> Valid
                          </span>
                        </div>
                        <div className="flex justify-between p-2 bg-muted/50 rounded items-center">
                          <span className="text-sm">sales@example.com</span>
                          <span className="text-sm text-yellow-500 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" /> Role-based
                          </span>
                        </div>
                        <div className="flex justify-between p-2 bg-muted/50 rounded items-center">
                          <span className="text-sm">random@temp-mail.org</span>
                          <span className="text-sm text-purple-500 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" /> Disposable
                          </span>
                        </div>
                        <div className="flex justify-between p-2 bg-muted/50 rounded items-center">
                          <span className="text-sm">me@nonexistent123.com</span>
                          <span className="text-sm text-red-500 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" /> Invalid
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Verified with 99% accuracy</span>
                        <span>1.2s</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Email Verification</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our multi-step verification process ensures the highest accuracy for every email you verify.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Comprehensive Checks</h3>
                  <p className="text-muted-foreground">
                    Syntax validation, domain verification, MX record checks, and SMTP verification for maximum accuracy.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Catch-All Detection</h3>
                  <p className="text-muted-foreground">
                    Identify domains that accept all emails, helping you avoid potential spam traps.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Disposable Email Detection</h3>
                  <p className="text-muted-foreground">
                    Identify temporary or throwaway email addresses that are likely to bounce or provide no value.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Role-based Detection</h3>
                  <p className="text-muted-foreground">
                    Identify addresses like info@, sales@, or support@ that often have higher bounce rates.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Typo Correction</h3>
                  <p className="text-muted-foreground">
                    Automatically detect and suggest corrections for common email typos in domains.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Spam Trap Detection</h3>
                  <p className="text-muted-foreground">
                    Identify potential spam traps that could harm your sender reputation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Verify your emails in three simple steps
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Input Emails</h3>
                <p className="text-muted-foreground">
                  Enter emails manually or upload a CSV file with your email list.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Verify</h3>
                <p className="text-muted-foreground">
                  Our system performs a comprehensive check on each email address.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Results</h3>
                <p className="text-muted-foreground">
                  View detailed results and download the verified email list in CSV format.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Credit-Based Pricing</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Pay only for what you use. No subscriptions or hidden fees.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="relative overflow-hidden card-hover">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
                <CardContent className="pt-8 relative">
                  <h3 className="text-xl font-semibold mb-1">Starter</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$10</span>
                    <span className="text-muted-foreground ml-1">/ 1,000 credits</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Perfect for small businesses and individual creators.
                  </p>
                  
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>1,000 email verifications</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>CSV uploads & downloads</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>Basic verification features</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>Results history (30 days)</span>
                    </li>
                  </ul>
                  
                  <Button asChild size="lg" className="w-full">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden card-hover border-primary shadow-md">
                <div className="absolute top-0 left-0 right-0 px-4 py-1 bg-primary text-white text-center text-sm font-medium">
                  Most Popular
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
                <CardContent className="pt-12 relative">
                  <h3 className="text-xl font-semibold mb-1">Professional</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$79</span>
                    <span className="text-muted-foreground ml-1">/ 10,000 credits</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Ideal for growing businesses and marketing teams.
                  </p>
                  
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>10,000 email verifications</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>CSV uploads & downloads</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>Advanced verification features</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>Detailed analytics</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>Results history (90 days)</span>
                    </li>
                  </ul>
                  
                  <Button asChild size="lg" className="w-full">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="relative overflow-hidden card-hover">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
                <CardContent className="pt-8 relative">
                  <h3 className="text-xl font-semibold mb-1">Enterprise</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$399</span>
                    <span className="text-muted-foreground ml-1">/ 100,000 credits</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    For large organizations with high volume needs.
                  </p>
                  
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>100,000 email verifications</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>CSV uploads & downloads</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>All verification features</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>API access</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>Dedicated support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>Results history (1 year)</span>
                    </li>
                  </ul>
                  
                  <Button asChild size="lg" className="w-full">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                Need more credits? <Link to="/contact" className="text-primary hover:underline">Contact us</Link> for custom pricing.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Verify Your Email Lists?</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                Start improving your deliverability today with our 99% accurate email verification system.
              </p>
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
