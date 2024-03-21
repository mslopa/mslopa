


const Dataprovider = () => {

      const [java, setJava] =useState('');
      const [cpp, setCpp] =useState('');
      const [python, setPython] =useState('');


      return(
               <DataContext.Provider
                     value={{
                              java,
                              setJava,
                              cpp, 
                              setCpp,
                              python, 
                              setPython

                     }}
              >

               </DataContext.Provider>





      )

}
export default Dataprovider