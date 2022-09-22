// import { Link, useNavigate } from "react-router-dom";

const MenuBurger = () => {
  //   const navigate = useNavigate();
  return (
    // <>
    //   {isOpen && (
    //     <>
    //       {token === null ? (
    //         <div>
    //           <button>
    //             <Link to="/login">Se connecter</Link>
    //           </button>
    //           <button>
    //             <Link to="/signup">S'inscrire</Link>
    //           </button>

    //           <button>
    //             <Link to={"/login"}>Vends maintenant</Link>
    //           </button>
    //         </div>
    //       ) : (
    //         <>
    //           <button
    //             onClick={() => {
    //               setUser(null);
    //               navigate("/");
    //             }}
    //             className="deconnexion-button"
    //           >
    //             Se déconnecter
    //           </button>
    //           <button>
    //             <Link to={"/publish"}>Vends maintenant</Link>
    //           </button>
    //         </>
    //       )}
    //     </>
    //   )}
    // </>
    <div className="hamburger">
      <div className="burger burger1" />
      <div className="burger burger2" />
      <div className="burger burger3" />
    </div>
  );
};
export default MenuBurger;
